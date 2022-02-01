import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Обновить пароль" title="Пароль" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Старый пароль"
            margin="normal"
            name="oldPassword"
            onChange={handleChange}
            type="password"
            value={values.oldPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Новый пароль"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Подтвердите пароль"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Обновить
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
