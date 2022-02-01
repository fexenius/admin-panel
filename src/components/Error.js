import React from "react";
import { Box, Container, Typography } from "@mui/material";
// Router
import { useNavigate, useLocation } from "react-router-dom";
// Apollo
import { useMutation, gql } from "@apollo/client";
// Auth
import { getRefreshToken } from "../auth/manageTokens";
import { useAuth } from "../auth/auth";

import Loading from "./Loading";

const Error = () => {
  const REFRESH = gql`
    mutation($refreshToken: String) {
      refresh(input: { refreshToken: $refreshToken }) {
        accessToken
        refreshToken
        message
      }
    }
  `;

  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [refresh] = useMutation(REFRESH);

  const refreshToken = getRefreshToken();

  async function refreshAccessToken() {
    const { data } = await refresh({
      variables: { refreshToken: refreshToken },
    });

    auth.signin(data.refresh, () => {
      navigate(from, { replace: true });
    });
  }

  if (refreshToken) {
    refreshAccessToken();
    return <Loading />;
  } else {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ m: 1 }} variant="h4">
            Внешняя ошибка! Проверьте работу API.
          </Typography>
        </Container>
      </Box>
    );
  }
};

export default Error;
