import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://content.newtonschool.co/v1/pr/main/users"
    );
    const data = await response.json();
    setUsers([...data]);
    setIsLoading(false);
  };

  const sortReverse = () => {
    let newUsers = [];
    if (sortAscending) {
      newUsers = users.sort((a, b) => a.name.length - b.name.length);
    } else {
      newUsers = users.sort((a, b) => b.name.length - a.name.length);
    }
    setUsers(newUsers);
    setSortAscending(!sortAscending);
    console.log(newUsers);
  };
  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchUsers}>
        Fetch User Data
      </button>
      <button className="sort-btn" onClick={sortReverse}>
        Sort by name length {sortAscending ? "ascending" : "descending"}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-section">
          {users.map((user, idx) => (
            <li key={idx}>
              <section className="id-section">{user.id}</section>
              <section className="name-email-section">
                <p className="name">Name: {user.name}</p>
                <p className="email">Email: {user.email}</p>
              </section>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
