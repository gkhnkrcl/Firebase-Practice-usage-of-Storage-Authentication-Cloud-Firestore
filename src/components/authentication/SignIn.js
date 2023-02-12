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
import { Link, useNavigate } from "react-router-dom";
import CenterContainer from "./CenterContainer";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(
        emailRef.current.children[1].firstElementChild.value,
        passwordRef.current.children[1].firstElementChild.value
      );
      navigate("/dashboard");
    } catch {
      setError("Failed to sign in");
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
        <Typography variant="h4">Sign In</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="email"
              label="email"
              type="email"
              required
              ref={emailRef}
            />
            <TextField
              id="password"
              label="password"
              type="password"
              ref={passwordRef}
              required
            />

            <Button fullWidth variant="contained" type="submit">
              Sign In
            </Button>

            <Typography variant="h6">
              Need an account? <Link to="/signup">Sign Up</Link>
            </Typography>
            <Typography variant="h6">
              <Link to={"/forgotpassword"}>Forgot Password? </Link>
            </Typography>
          </Stack>
        </Form>
      </Paper>
    </CenterContainer>
  );
};

export default SignIn;
