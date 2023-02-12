import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function File({ file }) {
  return (
    <a href={file.url} target="_blank" className="btn btn-outline-dark">
      <FontAwesomeIcon icon={faImage} />
    </a>
  );
}
