import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SettingsPassword } from "./components/SettingsPassword";

function Settings() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Настройки
        </Typography>
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
