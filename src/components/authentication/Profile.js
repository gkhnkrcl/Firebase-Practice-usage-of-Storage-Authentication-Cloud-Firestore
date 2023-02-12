import React, { useState } from "react";
import { Paper, Typography, Button, Alert } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenterContainer from "./CenterContainer";
import Navbar from "../google-drive/Navbar";

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, signout } = useAuth();
  const [error, setError] = useState("");

  const handleSignout = async () => {
    setError("");
    try {
      await signout();
      navigate("/");
    } catch (error) {
      setError("Failed to signout");
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <CenterContainer>
        <Paper
          elevation={5}
          sx={{
            width: "50%",
            height: "auto",
            textAlign: "center",
            padding: "2rem",
            margin: "5rem auto",
            display: "grid",
            gap: "1rem",
          }}
        >
          <Typography variant="h4">Profile</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <strong>Email:</strong>
          {currentUser.email}
          <Link to="/updateprofile" className="btn btn-primary w-50 m-auto">
            Update Profile
          </Link>
          <Button onClick={() => handleSignout()}>Sign Out</Button>
        </Paper>
      </CenterContainer>
    </>
  );
}
