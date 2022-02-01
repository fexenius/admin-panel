import React from "react";
import { Box, Container } from "@mui/material";
import { ActionBarDelivery } from "./components/ActionBarDelivery";
import { GridDelivery } from "./components/GridDelivery";

import { useQuery, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const DELIVERY = gql`
  query {
    delivery {
      id
      name
      townTime
      countryTime
      lastUpdate {
        date
      }
    }
  }
`;

function Delivery() {
  const { loading, error, data } = useQuery(DELIVERY);

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
        <ActionBarDelivery />
        <Box sx={{ mt: 3 }}>
          <GridDelivery delivery={data.delivery} />
        </Box>
      </Container>
    </Box>
  );
}

export default Delivery;
