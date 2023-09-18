import { Card } from "@/components/Card";
import Navbar from "@/components/Navbar";
import Summary from "@/components/Summary";
import { getAllTransactions } from "@/services/transaction";
import { useCallback, useEffect, useState } from "react";
import UserIcon from "@/assets/images/user.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser } from "@/services/auth";
import { Popup } from "@/components/Popup";
import logOut from "@/assets/images/logOut.svg";
import { useRouter } from "next/router";
import { showToast } from "../utils";
import { getSummary } from "../services/transaction/";
import CreateModalContent from "@/components/transaction/createModalContent";

export default function Profile() {
  const initialState = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  };

  const router = useRouter();
  const [data, setData] = useState([]);
  const { fullName } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [username, setUserName] = useState({});
  const [{ totalIncome, totalExpense, balance }, setUserBalance] =
    useState(initialState);

  const loadUser = useCallback(async (id) => {
    try {
      const user = await getUser(id);
      setUserName(user);
    } catch (error) {
      console.error("Error loading summary:", error);
    }
  }, []);
  const toggleOpenAlert = () => setOpenAlert((prevState) => !prevState);
  const toggleOpenModal = () => setOpenModal((prevState) => !prevState);

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
    loadTransactions();
    loadSummary();
  }, [loadTransactions, loadSummary]);

  const handleRequestClick = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID");
    router.push("/");
    showToast("Session Closed successfully", "success");
  };

  const reloadData = () => {
    loadTransactions();
    loadSummary();
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <div className="container-profile bg-light py-1">
            <Image width={200} priority src={UserIcon} alt="User Icon" />
            <h1>{username.fullName}</h1>
            <p>{username.email}</p>
            <div>
              <button
                onClick={toggleOpenAlert}
                type="button"
                className="btn btn-danger bold my-1"
              >
                Log Out
              </button>
              <button
                onClick={toggleOpenModal}
                className="btn btn-success my-1"
              >
                <span className="flex flex-items-center">Add Transaction</span>
              </button>
            </div>
          </div>
          <Summary
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
          />

          <h1>Today Transactions</h1>
          {data.map((transaction) => (
            <Card key={transaction.id} data={transaction} />
          ))}
        </div>
      </section>
      <CreateModalContent
        openModal={openModal}
        toggleOpenModal={toggleOpenModal}
        reloadData={reloadData}
      />
      <Popup
        buttonLabel="Yes, Exit "
        isOpen={openAlert}
        setIsOpen={toggleOpenAlert}
        handleClick={handleRequestClick}
      >
        <Image width={80} priority src={logOut} alt="trash Icon" />
        <h2 className="text-primary mx-1">Sure Do you want to Log Out?</h2>
      </Popup>
    </div>
  );
}
