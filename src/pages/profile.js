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

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const { fullName } = useSelector((state) => state.user);
  const [openAlert, setOpenAlert] = useState(false);
  const [username, setUserName] = useState({});

  const loadUser = useCallback(async (id) => {
    try {
      const user = await getUser(id);
      setUserName(user);
    } catch (error) {
      console.error("Error loading summary:", error);
    }
  }, []);
  const toggleOpenAlert = () => setOpenAlert((prevState) => !prevState);

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

  const handleRequestClick = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID");

    router.push("/");
    showToast("Session Closed successfully", "success");
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
            <button
              onClick={toggleOpenAlert}
              type="button"
              className="btn btn-danger bold -1"
            >
              Log Out
            </button>
          </div>
          <Summary />

          <h1>Today Transactions</h1>
          {data.map((transaction) => (
            <Card key={transaction.id} data={transaction} />
          ))}
        </div>
      </section>
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
