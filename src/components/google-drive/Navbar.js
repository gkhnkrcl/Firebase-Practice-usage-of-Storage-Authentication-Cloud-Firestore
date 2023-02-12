import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { Typography, Box } from "@mui/material";
import CenterContainer from "../authentication/CenterContainer";
import { Link } from "react-router-dom";

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#E8E2E2", marginBottom: "1rem" }}
    >
      <CenterContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            as={Link}
            to="/dashboard"
            sx={{ textDecorationLine: "none", color: "black " }}
          >
            GKN's
          </Typography>
          <Link to="/user">
            <Avatar alt="Remy Sharp" />
          </Link>
        </Box>
      </CenterContainer>
    </AppBar>
  );
}
export default ResponsiveAppBar;
