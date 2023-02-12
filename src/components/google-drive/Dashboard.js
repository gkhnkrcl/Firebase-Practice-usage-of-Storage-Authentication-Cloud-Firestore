import React from "react";
import CenterContainer from "../authentication/CenterContainer";
import Navbar from "./Navbar";
import { Stack } from "@mui/material";
import AppFolderButton from "./AppFolderButton";
import AppFileButton from "./AddFileButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "../google-drive/Folder";
import File from "../google-drive/File";
import { useParams, useLocation } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";

export default function Dashboard() {
  const { state = {} } = useLocation();
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId, state);

  return (
    <>
      <Navbar></Navbar>
      <div className="d-flex align-items-center ms-4">
        <FolderBreadcrumbs currentFolder={folder}></FolderBreadcrumbs>
      </div>
      <CenterContainer>
        <AppFolderButton currentFolder={folder}></AppFolderButton>
        <AddFileButton currentFolder={folder}></AddFileButton>
        <Stack sx={{ marginTop: "1rem", display: "d-grid" }}>
          {childFolders?.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFolders?.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "150px" }}
                  className="p-2"
                >
                  <Folder folder={childFolder}></Folder>
                </div>
              ))}
            </div>
          )}
          {childFolders?.length > 0 && childFiles?.length > 0 && <hr></hr>}
          {childFiles?.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFiles?.map((childFile) => (
                <div
                  key={childFile.id}
                  style={{ maxWidth: "150px" }}
                  className="p-2"
                >
                  <File file={childFile}></File>
                </div>
              ))}
            </div>
          )}
        </Stack>
      </CenterContainer>
    </>
  );
}
