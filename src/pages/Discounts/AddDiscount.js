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

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Box from "@mui/material/Box";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { useMutation, gql } from "@apollo/client";

const DISCOUNT_MUTATION = gql`
  mutation(
    $name: String
    $description: String
    $percent: Float
    $aboutUrl: String
    $active: Boolean
    $start: String
    $end: String
  ) {
    createDiscount(
      discount: {
        name: $name
        description: $description
        percent: $percent
        aboutUrl: $aboutUrl
        active: $active
        validity: { start: $start, end: $end }
      }
    ) {
      id
    }
  }
`;

const AddDiscount = (props) => {
  const [discount, setDiscount] = React.useState({
    name: "",
    description: "",
    percent: 0,
    aboutUrl: "",
    active: false,
    start: Date.now(),
    end: Date.now(),
  });

  const [addDiscount] = useMutation(DISCOUNT_MUTATION);

  const handleChangeName = (event) => {
    setDiscount((discount) => ({ ...discount, name: event.target.value }));
  };

  const handleChangeDescription = (event) => {
    setDiscount((discount) => ({
      ...discount,
      description: event.target.value,
    }));
  };

  const handleChangePercent = (event) => {
    setDiscount((discount) => ({ ...discount, percent: event.target.value }));
  };

  const handleChangeAboutUrl = (event) => {
    setDiscount((discount) => ({ ...discount, aboutUrl: event.target.value }));
  };

  const handleChangeActive = (event) => {
    setDiscount((discount) => ({ ...discount, active: event.target.checked }));
  };

  async function handleSaveDiscount(event) {
    event.preventDefault();

    await addDiscount({
      variables: {
        name: discount.name,
        description: discount.description,
        percent: Number(discount.percent),
        aboutUrl: discount.aboutUrl,
        active: Boolean(discount.active),
        start: discount.start,
        end: discount.end,
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
              Добавить скидку
            </Typography>
          </Box>

          <Paper>
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Скидка
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Название скидки"
                  name="name"
                  required
                  variant="outlined"
                  value={discount.name}
                  onChange={handleChangeName}
                />
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Описание скидки"
                    multiline
                    required
                    rows={6}
                    value={discount.description}
                    onChange={handleChangeDescription}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Размер скидки, (%)"
                    required
                    value={discount.percent}
                    onChange={handleChangePercent}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="URL адрес"
                    required
                    value={discount.aboutUrl}
                    onChange={handleChangeAboutUrl}
                  />
                </Box>

                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  mt={3}
                >
                  <Box>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Начало скидки"
                      inputFormat="dd/MM/yyyy HH:mm"
                      mask="__/__/____ __:__"
                      minDate={Date.now()}
                      value={discount.start}
                      onChange={(date) => {
                        setDiscount((discount) => ({
                          ...discount,
                          start: date,
                        }));
                      }}
                    />
                  </Box>
                  <Box>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Конец скидки"
                      inputFormat="dd/MM/yyyy HH:mm"
                      mask="__/__/____ __:__"
                      minDate={Date.now()}
                      value={discount.end}
                      onChange={(date) => {
                        setDiscount((discount) => ({
                          ...discount,
                          end: date,
                        }));
                      }}
                    />
                  </Box>
                </Stack>
                <Box sx={{ mt: 3 }}>
                  <FormControlLabel
                    label="Статус действия скидки"
                    control={
                      <Checkbox
                        checked={discount.active}
                        onChange={handleChangeActive}
                      />
                    }
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
                onClick={handleSaveDiscount}
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

export default AddDiscount;
