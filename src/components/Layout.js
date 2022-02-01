import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ActionBar } from "./ActionBar";
import { SideBar } from "./SideBar";

import { useAuth } from "../auth/auth";

import { Outlet } from "react-router-dom";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const Layout = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  let auth = useAuth();

  if (auth.token) {
    return (
      <>
        <LayoutRoot>
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Outlet />
          </Box>
        </LayoutRoot>
        <ActionBar onSidebarOpen={() => setSidebarOpen(true)} />
        <SideBar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      </>
    );
  } else {
    return <Outlet />;
  }
};

export default Layout;