import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import FaceIcon from "@mui/icons-material/Face";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
// Apollo
import { useMutation, gql } from "@apollo/client";
import { getAccessToken } from "../auth/manageTokens";

// Login mutation
const LOGOUT = gql`
  mutation($accessToken: String) {
    logout(input: { accessToken: $accessToken })
  }
`;

const ActionBarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const ActionBar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const [logout] = useMutation(LOGOUT);

  const auth = useAuth();
  const accessToken = getAccessToken();

  async function handlerLogout() {
    // Clear tokens in database
    await logout({
      variables: { accessToken: accessToken },
    });
    // Clear tokens in local storage
    auth.signout(() => navigate("/login"));
  }

  const navigate = useNavigate();
  return (
    <>
      <ActionBarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            aria-label="Меню"
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {auth.token && (
            <Tooltip title="Выход">
              <IconButton sx={{ ml: 1 }} onClick={handlerLogout}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Профиль">
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1,
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <FaceIcon fontSize="small" />
            </Avatar>
          </Tooltip>
        </Toolbar>
      </ActionBarRoot>
    </>
  );
};

ActionBar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default ActionBar;
