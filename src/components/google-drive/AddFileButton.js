import React, { useState } from "react";
import ReactDOM from "react-dom";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/AuthContext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  serverTimestamp,
  getDocs,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { storage, database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidv4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

export default function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();
  function handleUpload(e) {
    const id = uuidv4();
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}}`;

    const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },

      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        getDownloadURL(
          ref(storage, `/files/${currentUser.uid}/${filePath}`)
        ).then((url) => {
  
          addDoc(database.files, {
            url: url,
            name: file.name,
            folderId: currentFolder.id,
            userId: currentUser.uid,
            timestamp: serverTimestamp(),
          });
        });
      }
    );
  }
  return (
    <>
      <label className="btn mr-2">
        <FontAwesomeIcon
          className=" btn btn-outline-success"
          style={{ height: "30px" }}
          icon={faFileUpload}
        ></FontAwesomeIcon>

        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        ></input>
      </label>
      {uploadingFiles?.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles?.map((file) => (
              <Toast key={file.id}>
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  ></ProgressBar>
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
