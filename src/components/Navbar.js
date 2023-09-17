import { getUser } from "@/services/auth";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { fullName } = useSelector((state) => state.user);
  const [username, setUserName] = useState("");

  const loadUser = useCallback(async (id) => {
    try {
      const user = await getUser(id);
      setUserName(user.fullName);
    } catch (error) {
      console.error("Error loading summary:", error);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    console.log("userId", userId);
    if (fullName) {
      return;
    }
    loadUser(userId);
  }, [fullName, loadUser]);

  return (
    <nav className="navbar">
      <div className="text-lead">Finance Tracker</div>
      <ul className="navbar-menu">
        <li className="navbar-menu-item">
          <Link href="/categories">Categories</Link>
        </li>

        <li className="navbar-menu-item">
          <Link href="/">Budgets</Link>
        </li>
        <li className="navbar-menu-item">
          <Link href="/historical">Historical</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
