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

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      passwordRef.current.children[1].firstElementChild.value !==
      passwordConfirmRef.current.children[1].firstElementChild.value
    ) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.children[1].firstElementChild.value,
        passwordRef.current.children[1].firstElementChild.value
      );
    } catch {
      setError("Failed to create an account");
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
        <Typography variant="h4">Sign Up</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: "1rem" }}>
            {error}
          </Alert>
        )}
        {loading && (
          <Alert severity="success" sx={{ mb: "1rem" }}>
            Kayıt Başarılı!
          </Alert>
        )}
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
            <TextField
              id="password-confirm"
              label="password-confirm"
              type="password"
              ref={passwordConfirmRef}
              required
            />
            <Button fullWidth variant="contained" type="submit">
              Sign Up
            </Button>

            <Typography variant="h6">
              Already Have An Acount? <Link to="/">Sign in</Link>
            </Typography>
          </Stack>
        </Form>
      </Paper>
    </CenterContainer>
  );
};

export default SignUp;
