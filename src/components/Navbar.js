import Link from "next/link";
import Image from "next/image";
import wallet from "@/assets/images/wallet.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <Image width={45} priority src={wallet} alt="Wallet Icon" />
        <p className="text-lead bold ">FinanceTracker</p>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-menu-item">
          <Link href="/profile">Profile</Link>
        </li>

        <li className="navbar-menu-item">
          <Link href="/categories">Categories</Link>
        </li>

        <li className="navbar-menu-item">
          <Link href="/historical">Historical</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
