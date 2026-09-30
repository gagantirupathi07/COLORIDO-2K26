package com.colorido.com.colorido.security;

import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        System.out.println(
                "JWT REQUEST: "
                        + request.getMethod()
                        + " "
                        + request.getRequestURI()
        );

        System.out.println(
                "AUTHORIZATION HEADER PRESENT: "
                        + (authorizationHeader != null)
        );

        if (
                authorizationHeader == null
                        || !authorizationHeader.startsWith("Bearer ")
        ) {

            System.out.println(
                    "JWT FILTER: No Bearer token"
            );

            filterChain.doFilter(request, response);
            return;
        }

        String token =
                authorizationHeader.substring(7);

        System.out.println(
                "JWT FILTER: Bearer token received"
        );

        try {

            String email =
                    jwtService.extractUsername(token);

            System.out.println(
                    "JWT FILTER: Token email = "
                            + email
            );

            if (
                    email != null
                            && SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null
            ) {

                User user =
                        (User) userDetailsService
                                .loadUserByUsername(email);

                System.out.println(
                        "JWT FILTER: User found = "
                                + user.getEmail()
                );

                System.out.println(
                        "JWT FILTER: User role = "
                                + user.getRole()
                );

                System.out.println(
                        "JWT FILTER: Authorities = "
                                + user.getAuthorities()
                );

                boolean valid =
                        jwtService.isTokenValid(
                                token,
                                user
                        );

                System.out.println(
                        "JWT FILTER: Token valid = "
                                + valid
                );

                if (valid) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user,
                                    null,
                                    user.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );

                    System.out.println(
                            "JWT FILTER: AUTHENTICATION SET"
                    );

                    System.out.println(
                            "JWT FILTER: Current authorities = "
                                    + SecurityContextHolder
                                    .getContext()
                                    .getAuthentication()
                                    .getAuthorities()
                    );
                }
            }

        } catch (Exception exception) {

            System.out.println(
                    "JWT FILTER ERROR: "
                            + exception.getClass().getName()
            );

            System.out.println(
                    "JWT FILTER ERROR MESSAGE: "
                            + exception.getMessage()
            );

            exception.printStackTrace();

            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}