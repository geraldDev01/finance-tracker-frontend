import { Card } from "@/components/Card";
import Navbar from "@/components/Navbar";
import Summary from "@/components/Summary";
import { getAllTransactions } from "@/services/transaction";
import { useCallback, useEffect, useState } from "react";

export default function Profile() {
  const [data, setData] = useState([]);

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
  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <Summary />

          <h1>Today Transactions</h1>
          {data.map((transaction) => (
            <Card key={transaction.id} data={transaction} />
          ))}
        </div>
      </section>
    </div>
  );
}
