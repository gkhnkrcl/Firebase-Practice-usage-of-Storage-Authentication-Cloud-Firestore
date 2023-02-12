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

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatemail, updatepassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      passwordRef.current.children[1].firstElementChild.value !==
      passwordConfirmRef.current.children[1].firstElementChild.value
    ) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (
      emailRef.current.children[1].firstElementChild.value !== currentUser.email
    ) {
      promises.push(
        updatemail(emailRef.current.children[1].firstElementChild.value)
      );
    }
    if (passwordRef.current.children[1].firstElementChild.value) {
      promises.push(
        updatepassword(passwordRef.current.children[1].firstElementChild.value)
      );
    }

    Promise.all(promises)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Typography variant="h4">Update Profile</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="email"
              label="email"
              type="email"
              required
              ref={emailRef}
              defaultValue={currentUser.email}
            />
            <TextField
              id="password"
              label="password"
              type="password"
              ref={passwordRef}
              required
              placeholder="leave blank to keep the same"
            />
            <TextField
              id="password-confirm"
              label="password-confirm"
              type="password"
              ref={passwordConfirmRef}
              placeholder="leave blank to keep the same"
            />
            <Button fullWidth variant="contained" type="submit">
              Update
            </Button>

            <Typography variant="h6">
              <Link to="/user">Cancel</Link>
            </Typography>
          </Stack>
        </Form>
      </Paper>
    </CenterContainer>
  );
}

export default UpdateProfile;
