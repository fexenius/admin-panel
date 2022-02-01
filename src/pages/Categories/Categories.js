import React from "react";
import { Box, Container } from "@mui/material";
import { ActionBarCategories } from "./components/ActionBarCategories";
import { GridCategories } from "./components/GridCategories";

import { useQuery, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const CATEGORIES = gql`
  query {
    categories {
      id
      name
      parrent {
        name
      }
    }
  }
`;

function Categories() {
  const { loading, error, data } = useQuery(CATEGORIES);

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
        <ActionBarCategories />
        <Box sx={{ mt: 3 }}>
          <GridCategories categories={data.categories} />
        </Box>
      </Container>
    </Box>
  );
}

export default Categories;
