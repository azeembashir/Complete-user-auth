import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import useGeneral from "../hooks/useGeneral";

const Profile = () => {
    const { navigate } = useGeneral();
  // 🔹 Static data (baad mein dynamic kar lena)
  const user = {
    name: "Azeem Bashir",
    email: "azeem@gmail.com",
  };

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Profile Icon */}
        <div style={styles.avatar}>{firstLetter}</div>

        {/* User Info */}
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>
        <Button variant="contained" endIcon={<Logout />} onClick={() => navigate("/login")}>Logout</Button>
      </div>
      
    </div>
  );
};

export default Profile;

// 🔹 Simple inline styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "32px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
  },
  name: {
    margin: "10px 0 5px",
  },
  email: {
    color: "#6b7280",
    fontSize: "14px",
  },
};
