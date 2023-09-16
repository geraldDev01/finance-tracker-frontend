import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import PropTypes from "prop-types";

export const Table = ({ columns, data }) => {
  const renderColumns = () =>
    columns.map((column) => <th key={column}>{column}</th>);

  const renderRows = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length}>
           <span className="table-message">
           <FeatherIcon size="22" icon="alert-circle" /> No data
           </span>
          </td>
        </tr>
      );
    }
    return data.map((item, index) => (
      <tr key={index}>
        {columns.map((column) => (
          <td key={column}>{item[column.toLowerCase()]}</td>
        ))}
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>{renderColumns()}</tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
