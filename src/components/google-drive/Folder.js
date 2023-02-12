import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      as={Link}
      variant="outline-dark"
      className="text-truncate w-100"
    >
      <FontAwesomeIcon
        icon={faFolder}
        style={{ color: "grey", transform: "scale(1.6)" }}
        className="me-2"
      ></FontAwesomeIcon>
      {folder.name}
    </Button>
  );
}
