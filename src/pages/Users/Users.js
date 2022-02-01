import React from "react";
import { Box, Container } from "@mui/material";
import { ActionBarUser } from "./components/ActionBarUser";
import { GridUsers } from "./components/GridUsers";

import { useQuery, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const USERS = gql`
  query {
    users {
      id
      username
      password
      created
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <ActionBarUser />
        <Box sx={{ mt: 3 }}>
          <GridUsers users={data.users} />
        </Box>
      </Container>
    </Box>
  );
}

export default Users;
