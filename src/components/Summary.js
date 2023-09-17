import { useCallback, useEffect, useState } from "react";
import { getSummary } from "../services/transaction/";

const Summary = () => {
  const initialState = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  };
  const [{ totalIncome, totalExpense, balance }, setUserBalance] =
    useState(initialState);

  const loadSummary = useCallback(async () => {
    try {
      const summary = await getSummary();
      if (summary) {
        setUserBalance(summary);
      }
    } catch (error) {
      console.error("Error loading summary:", error);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  return (
    <section className="balance-container flex flex-col py-2">
      <p className="text-lead">Your Balance</p>
      <h1 className="text-large">{balance.toLocaleString()} US</h1>
      <div className="balance-incomes border bg-light">
        <div>
          <p className="bold">Total Incomes</p>
          <p className="success-color text-large">
            {totalIncome ? totalIncome.toLocaleString() : 0}
          </p>
        </div>
        <div>
          <p className="bold">Total Expenses</p>
          <p className="danger-color text-large">
            {totalExpense ? -totalExpense.toLocaleString() : 0}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Summary;
