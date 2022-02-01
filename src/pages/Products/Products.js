import React from "react";
import { Box, Container } from "@mui/material";
import { ActionBarProducts } from "./components/ActionBarProducts";
import { GridProducts } from "./components/GridProducts";

import { useQuery, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const PRODUCTS = gql`
  query {
    products {
      id
      name
      category {
        name
      }
      vendor {
        name
      }
      articles {
        model
        price
        quantity
        stockStatus
      }
      lastUpdate
    }
  }
`;

function Products() {
  const { loading, error, data } = useQuery(PRODUCTS);

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
        <ActionBarProducts />
        <Box sx={{ mt: 3 }}>
          <GridProducts products={data.products} />
        </Box>
      </Container>
    </Box>
  );
}

export default Products;
