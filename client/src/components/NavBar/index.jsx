import { UserContext } from "../../context/userContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const { userData, setUserData } = useContext(UserContext);
  const { username, userId } = userData;
  const onLogoutClick = () => {
    setUserData({ username: "", userId: "" });
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            {username ? (
              <Link to="/">
                <button onClick={onLogoutClick}>Logout</button>
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <Link to="/authors">Authors</Link>
            <Link to="/">Books</Link>
            {username && <Link to="/profile">Profile</Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
}
