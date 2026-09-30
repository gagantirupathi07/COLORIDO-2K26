function AdminDataTable({
  columns,
  data,
  rowKey,
  onRowClick
}) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={
                rowKey
                  ? rowKey(item)
                  : item.id ?? index
              }
              onClick={() =>
                onRowClick && onRowClick(item)
              }
              className={
                onRowClick
                  ? "admin-table-row-clickable"
                  : ""
              }
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : item[column.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDataTable;