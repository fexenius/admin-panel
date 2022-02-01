import { Box, Container, Grid } from "@mui/material";
import { LatestOrders } from "./components/LatestOrders";

function Home() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
