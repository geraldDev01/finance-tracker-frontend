import { Card } from "@/components/Card";
import Navbar from "@/components/Navbar";
import Summary from "@/components/Summary";
import { getAllTransactions } from "@/services/transaction";
import { useCallback, useEffect, useState } from "react";
import UserIcon from "@/assets/images/user.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser } from "@/services/auth";

export default function Profile() {
  const [data, setData] = useState([]);
  const { fullName } = useSelector((state) => state.user);
  const [username, setUserName] = useState({});

  const loadUser = useCallback(async (id) => {
    try {
      const user = await getUser(id);
      setUserName(user);
    } catch (error) {
      console.error("Error loading summary:", error);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (fullName) {
      return;
    }
    loadUser(userId);
  }, [fullName, loadUser]);

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
          <div className="container-profile bg-light py-1">
            <Image width={200} priority src={UserIcon} alt="User Icon" />
            <h1>{username.fullName}</h1>
            <p>{username.email}</p>
          </div>
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
