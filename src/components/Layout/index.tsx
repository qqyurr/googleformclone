import React from "react";
import { Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      minHeight: "100vh",
      height: "100%",
      boxSizing: "border-box",
      pb: 8,
      overflow: "hidden",
      backgroundColor: "#EDE7F6",
    }}
  >
    {children}
  </Box>
);

export default React.memo(Layout);
