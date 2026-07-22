import "./Topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PIBLIC_FOLDER;

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          "/api/user/search?query=" + query
        );

        setResults(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    searchUsers();
  }, [query]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">social</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />

          <input
            type="text"
            placeholder="Search for friends..."
            className="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {results.length > 0 && (
            <div className="searchResults">
              {results.map((person) => (
                <div
                  key={person._id}
                  className="searchResult"
                  onClick={() => {
                    navigate("/profile/" + person.username);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <img
                    src={
                      person.profilePicture
                        ? PF + person.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="searchResultImg"
                  />

                  <span>{person.username}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}