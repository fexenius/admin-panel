import React from "react";
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";

import Box from "@mui/material/Box";
import RateList from "./components/RateList";

import { useMutation, gql } from "@apollo/client";

const DELIVERY_MUTATION = gql`
  mutation(
    $name: String
    $townTime: Int
    $countryTime: Int
    $prices: [RateInput]
  ) {
    createDelivery(
      delivery: {
        name: $name
        townTime: $townTime
        countryTime: $countryTime
        prices: $prices
      }
    ) {
      id
    }
  }
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const AddDelivery = (props) => {
  const [items, setItems] = React.useState([]);

  const [delivery, setDelivery] = React.useState({
    name: "",
    townTime: "",
    countryTime: "",
  });

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  const handleAddValue = (event) => {
    const id = items.length;
    const rand = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    let newItems = items.slice();
    newItems.push({
      ids: id + 1 + "|" + rand,
      regionName: "",
      deliveryType: "",
      amount: 0,
    });
    setItems(newItems);
  };

  const [addDelivery] = useMutation(DELIVERY_MUTATION);

  const handleChangeName = (event) => {
    setDelivery((delivery) => ({ ...delivery, name: event.target.value }));
  };

  const handleChangeTownTime = (event) => {
    setDelivery((delivery) => ({ ...delivery, townTime: event.target.value }));
  };

  const handleChangeCountryTime = (event) => {
    setDelivery((delivery) => ({
      ...delivery,
      countryTime: event.target.value,
    }));
  };

  async function handleSaveDelivery(event) {
    event.preventDefault();

    const prices = [];

    items.forEach((item) => {
      prices.push({
        regionName: item.regionName,
        deliveryType: item.deliveryType,
        amount: Number(item.amount),
      });
    });

    await addDelivery({
      variables: {
        name: delivery.name,
        townTime: Number(delivery.townTime),
        countryTime: Number(delivery.countryTime),
        prices: prices,
      },
    });
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="false">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Вариант доставки
            </Typography>
          </Box>

          <Paper>
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Тариф
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Название тарифа"
                  name="name"
                  required
                  variant="outlined"
                  value={delivery.name}
                  onChange={handleChangeName}
                />
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Количество дней доставки по городу"
                    required
                    value={delivery.townTime}
                    onChange={handleChangeTownTime}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Количество дней доставки по стране"
                    required
                    value={delivery.countryTime}
                    onChange={handleChangeCountryTime}
                  />
                </Box>

                <Box
                  sx={{
                    bgcolor: "background.container",
                    boxShadow: 1,
                    borderRadius: 1,
                    p: 2,
                    mt: 3,
                  }}
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      my: 2,
                    }}
                  >
                    <Typography variant="h6">
                      Список значений характеристики
                    </Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ marginLeft: "auto" }}
                      onClick={handleAddValue}
                    >
                      Добавить значение
                    </Button>
                  </Box>
                  <RateList
                    items={items}
                    setItems={setItems}
                    onDragEnd={onDragEnd}
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pb: 3,
                pr: 3,
              }}
            >
              <Button
                color="primary"
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleSaveDelivery}
              >
                Сохранить
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AddDelivery;
