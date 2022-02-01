import React from "react";
import { Box, Container } from "@mui/material";
import { ActionBarAttributes } from "./components/ActionBarAttributes";
import { GridAttributes } from "./components/GridAttributes";

import { useQuery, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const ATTRIBUTES = gql`
  query {
    attributes {
      id
      name
      type
      category {
        name
      }
    }
  }
`;

function Attributes() {
  const { loading, error, data } = useQuery(ATTRIBUTES);

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
        <ActionBarAttributes />
        <Box sx={{ mt: 3 }}>
          <GridAttributes attributes={data.attributes} />
        </Box>
      </Container>
    </Box>
  );
}

export default Attributes;
