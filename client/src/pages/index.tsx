import { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        const newUser = await res.json();
        setUsers([...users, newUser]); // Update UI with new user
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id)); // Remove from UI
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div>
      <h1>Users List</h1>
      
      {/* Form to add new users */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Display users */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}{" "}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
