import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { App, Colors } from "../helpers";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      <Link color={Colors.primary} href="/">
        {App.name}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
