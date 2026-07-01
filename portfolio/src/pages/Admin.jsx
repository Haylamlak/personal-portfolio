import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/contact", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete message
  const deleteMessage = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin">
      <h1>📊 Admin Dashboard</h1>
      <p>All Contact Messages</p>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{msg.created_at}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;