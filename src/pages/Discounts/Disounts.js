import React from "react";
import { Box, Container } from "@mui/material";
import { ActionBarDiscounts } from "./components/ActionBarDiscounts";
import { GridDiscounts } from "./components/GridDiscounts";

import { useQuery, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const DISCOUNTS = gql`
  query {
    discounts {
      id
      name
      percent
      active
      validity {
        start
        end
      }
      lastUpdate {
        date
      }
    }
  }
`;

function Discounts() {
  const { loading, error, data } = useQuery(DISCOUNTS);

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
        <ActionBarDiscounts />
        <Box sx={{ mt: 3 }}>
          <GridDiscounts discounts={data.discounts} />
        </Box>
      </Container>
    </Box>
  );
}

export default Discounts;
