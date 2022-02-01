import React from "react";
// Router
import { useNavigate, useLocation, Link } from "react-router-dom";
// Apollo
import { useMutation, gql } from "@apollo/client";
// Material UI
import { Box, Button, Container, TextField, Typography } from "@mui/material";

//Auth
import { useAuth } from "../../auth/auth";

function Login() {
  // Login mutation
  const LOGIN = gql`
    mutation($username: String, $password: String) {
      login(input: { username: $username, password: $password }) {
        accessToken
        refreshToken
        message
      }
    }
  `;

  const [login] = useMutation(LOGIN);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const auth = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    // Get value input
    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");
    let password = formData.get("password");

    // Use login mutation with value input form
    const { data } = await login({
      variables: { username: username, password: password },
    });

    // Handler tokens in auth.js
    auth.signin(data.login, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Войти в систему
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                с помощью имени пользователя и пароля
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Имя пользователя"
              margin="normal"
              name="username"
              type="text"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Пароль"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Войти
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              У вас нет аккаунта? <Link to="/register">Регистрация</Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default Login;
