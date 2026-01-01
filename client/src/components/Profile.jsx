import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import useGeneral from "../hooks/useGeneral";
import { useEffect } from "react";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState("");
  const { navigate } = useGeneral();
  const [loading, setLoading] = useState(false);

  const logoutUser = async () => {
    try {
      const result = await httpAction({
        url: apis().userLogout,
        method: "POST",
      });

      if (result?.success) {
        toast.success(result.message || "User logout successful");
        navigate("/login");
      } else {
        console.log("error");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const data = {
        url: apis().userProfile,
      };
      const result = await httpAction(data);
      if (result?.success) {
        setUser(result.user);
      }else{
        navigate('/login')
      }
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div style={loadingStyles.container}>
        <CircularProgress />
        <p style={loadingStyles.text}>Loading profile...</p>
      </div>
    );
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Profile Icon */}
        <div style={styles.avatar}>{firstLetter}</div>

        {/* User Info */}
        <h2 style={styles.name}>{user?.name}</h2>
        <p style={styles.email}>{user?.email}</p>
        <Button
          variant="contained"
          endIcon={<Logout />}
          onClick={logoutUser}
        >
          Logout
        </Button>
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
const loadingStyles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8",
  },
  text: {
    fontSize: "14px",
    color: "#6b7280",
  },
};
