import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>All rights reserved &copy; {new Date().getFullYear()}</p>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="">Register as Seller</Link>
        </li>
      </ul>
    </footer>
  );
}
