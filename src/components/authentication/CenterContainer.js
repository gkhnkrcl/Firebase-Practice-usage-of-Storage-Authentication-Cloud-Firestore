import React from "react";
import { Container } from "@mui/material";

export default function CenterContainer({ children }) {
  return <Container maxWidth="xl">{children}</Container>;
}
