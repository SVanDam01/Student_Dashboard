function Table({ data }) {
  // ** SET HEADERNAMES ** //
  const headers = ["Name", "Assignment", "Difficulty", "Fun"];

  // ** SET HEADERNAMES FOR EACH COLUMN ** //
  const headerList = headers.map((header) => (
    <th key={header.toString()} className="header__item">
      {header}
    </th>
  ));

  // ** SET ITEMS FOR EACH ROW ** //
  const itemsList = data.map((item) => (
    <tr key={item.id} className="item__list">
      <td className="item">{item.name} </td>
      <td className="item">{item.assignment} </td>
      <td className="item">{item.difficulty} </td>
      <td className="item">{item.fun} </td>
    </tr>
  ));

  return (
    // ** SET TABLE ** //
    <div className="table_content_container">
      <table>
        <thead className="table-header">
          <tr>{headerList}</tr>
        </thead>
        <tbody>{itemsList}</tbody>
      </table>
    </div>
  );
}

export default Table;
