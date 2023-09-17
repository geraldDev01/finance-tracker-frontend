import { Chart } from "@/components/Chart";
import Navbar from "@/components/Navbar";
import { getSummary } from "@/services/transaction";
import { useCallback, useEffect, useState } from "react";

export default function Graphics() {
  const initialState = {
    totalIncome: 0,
    totalExpense: 0,
    expensesByCategory: [],
    incomesByCategory: [],
  };
  const [userBalance, setUserBalance] = useState(initialState);
  console.log("userBalance", userBalance);

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
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-large">Chats Data </h1>
        <p className="text-lead primary-color">
          Now you can create a <strong>SEE</strong> all your total expenses and
          incomes per <strong>CATEGORY</strong>
        </p>

        <section className="chart-container bg-light mt-2">
          <div>
            <h1 className="danger-color">TOTAL EXPENSES</h1>
            <Chart dataProp={userBalance.expensesByCategory} />
          </div>
          <div>
            <h1 className="success-color">TOTAL INCOMES</h1>
            <Chart dataProp={userBalance.incomesByCategory} />
          </div>
        </section>
      </div>
    </div>
  );
}
