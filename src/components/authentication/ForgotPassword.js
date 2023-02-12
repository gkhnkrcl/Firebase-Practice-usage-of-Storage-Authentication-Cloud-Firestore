import React, { useRef, useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import CenterContainer from "./CenterContainer";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setmessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setmessage("");
      setLoading(true);
      await resetPassword(emailRef.current.children[1].firstElementChild.value);
      setmessage("check your inbox");
    } catch {
      setError("Failed to reset E-mail ");
    }

    setLoading(false);
  }
  return (
    <CenterContainer>
      <Paper
        elevation={5}
        sx={{
          width: "50%",
          height: "auto",
          textAlign: "center",
          padding: "2rem",
          margin: "5rem auto",
        }}
      >
        <Typography variant="h4">Reset Password</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="info">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="email"
              label="email"
              type="email"
              required
              ref={emailRef}
            />
            <Button fullWidth variant="contained" type="submit">
              Reset Password
            </Button>

            <Typography variant="h6">
              Already Have An Acount? <Link to="/">Sign in</Link>
            </Typography>
            <Typography variant="h6">
              Need an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Stack>
        </Form>
      </Paper>
    </CenterContainer>
  );
};

export default ForgotPassword;
