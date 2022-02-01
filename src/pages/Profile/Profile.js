import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "./components/AccountProfile";
import { AccountProfileDetails } from "./components/AccountProfileDetails";

const Profile = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="100">
        <Typography sx={{ mb: 3 }} variant="h4">
          Профиль
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Profile;
