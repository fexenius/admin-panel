import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";
import { TextField, Box, Grid, Paper } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RateListItem = ({ items, setItems, item, index }) => {
  const handleChangeDeliveryType = (event) => {
    const newArray = Array.from(items);
    newArray[index].deliveryType = event.target.value;
    setItems(newArray);
  };

  const handleChangeRegionName = (event) => {
    const newArray = Array.from(items);
    newArray[index].regionName = event.target.value;
    setItems(newArray);
  };

  const handleChangeAmount = (event) => {
    const newArray = Array.from(items);
    newArray[index].amount = event.target.value;
    setItems(newArray);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    const result = Array.from(items);
    result.splice(index, 1);
    setItems(result);
  };

  return (
    <Draggable draggableId={item.ids} index={index}>
      {(provided, snapshot) => (
        <ListItem
          disableGutters
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper sx={{ p: 3, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={11}>
                <Box sx={{ flex: "auto", mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Название региона"
                    value={item.regionName}
                    onChange={handleChangeRegionName}
                  />
                </Box>
                <Box sx={{ flex: "auto", mt: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Тип доставки
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.deliveryType}
                        label="Тип доставки"
                        onChange={handleChangeDeliveryType}
                      >
                        <MenuItem value={"custom"}>Самовывоз</MenuItem>
                        <MenuItem value={"courier"}>
                          Курьерская доставка
                        </MenuItem>
                        <MenuItem value={"mail"}>Почтовое отправление</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ flex: "auto", mt: 2 }}>
                      <TextField
                        label="Стоимость"
                        onChange={handleChangeAmount}
                        value={item.amount}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} md={1}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <IconButton
                    aria-label="delete"
                    key={item.ids}
                    value={item.ids}
                    onClick={handleRemove}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </ListItem>
      )}
    </Draggable>
  );
};

export default RateListItem;
