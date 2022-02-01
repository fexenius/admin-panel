import React from "react";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    </Box>
  );
};

export default Loading;
