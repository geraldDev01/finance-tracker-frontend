import Link from "next/link";
import PropTypes from "prop-types";

 const Navbar = ({ username }) => {
  return (
    <nav className="navbar">
      <div className="text-lead">Finance Tracker</div>
      <ul className="navbar-menu">
        <li className="navbar-menu-item">
          <Link href="/">Profile</Link>
        </li>
        <li className="navbar-menu-item">
          <Link href="/">Budgets</Link>
        </li>

        <li className="navbar-menu-item">Welcome, {username}</li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Navbar;
