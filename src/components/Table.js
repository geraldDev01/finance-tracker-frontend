import { getAllTransactions } from "@/services/transaction";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import ConfirmAlert from "./transaction/ConfirmAlert";

export const Table = () => {
  const columns = ["Date", "Description", "Category", "Type", "Amount"];
  const [openAlert, setOpenAlert] = useState(false);
  const [data, setData] = useState([]);

  const [deleteTransactionId, setDeleteTransactionId] = useState(null);

  const loadTransactions = useCallback(async () => {
    try {
      const transactions = await getAllTransactions();
      if (transactions) {
        setData(transactions);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const toggleOpenAlert = () => setOpenAlert((prevState) => !prevState);
  const renderColumns = () => (
    <>
      {" "}
      {columns.map((column) => (
        <th key={column}>{column}</th>
      ))}
      <th>Actions</th>
    </>
  );

  console.log("deleteTransactionId", deleteTransactionId);
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
          <td
            className={
              item.type === "Expense" ? "danger-color bold" : "success-color"
            }
            key={column}
          >
            {item[column.toLowerCase()]}
          </td>
        ))}
        <td>
          <button
            onClick={() => {
              toggleOpenAlert();
              setDeleteTransactionId(item.id);
            }}
            className="btn  btn-danger"
          >
            <FeatherIcon size="15" icon="trash-2" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <ConfirmAlert
        id={deleteTransactionId}
        openAlert={openAlert}
        toggleOpenAlert={toggleOpenAlert}
        loadTransactions={loadTransactions}
      />
      <table>
        <thead>
          <tr>{renderColumns()}</tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </>
  );
};
