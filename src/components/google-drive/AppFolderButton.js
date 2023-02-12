import React, { useState } from "react";
import { Button, Modal, Typography, TextField, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AppFolderButton({ currentFolder }) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    addDoc(database.folders, {
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      timestamp: serverTimestamp(),
    });

    setName("");
    closeModal();
  }
  return (
    <>
      <FontAwesomeIcon
        className="btn btn-outline-success"
        onClick={openModal}
        style={{ height: "30px" }}
        icon={faFolderPlus}
      />
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: { xs: "75%", md: "50%" },
          height: "50%",
          margin: "5rem auto",
          textAlign: "start",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Paper
            sx={{
              display: "grid",
              padding: { xs: "1rem", md: "4rem" },
              gap: "1rem",
            }}
          >
            <Typography variant="h5">Folder Name</Typography>
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              id="text"
              label="Folder Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Button variant="outlined" type="submit">
              Add Folder
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              Close
            </Button>
          </Paper>
        </Form>
      </Modal>
    </>
  );
}
