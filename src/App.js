import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  if (loading) return <h2>Loading users...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearch}
        style={{ padding: "10px", marginBottom: "20px" }}
      />

      {filteredUsers.map((user) => (
        <div key={user.id} style={{
          background: "#f4f4f4",
          padding: "15px",
          margin: "10px auto",
          width: "300px",
          borderRadius: "8px"
        }}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;