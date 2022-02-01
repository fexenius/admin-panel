import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";
import { TextField, Box, Grid, Paper } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableListItem = ({
  product,
  setProduct,
  idCurrentArticle,
  item,
  index,
}) => {
  const handleChangeName = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.payment.installmentPlans[index].name = event.target.value;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeTerm = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.payment.installmentPlans[index].term = Number(
      event.target.value
    );
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleRemove = (event) => {
    event.preventDefault();

    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.payment.installmentPlans.splice(index, 1);
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          disableGutters
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper sx={{ p: 3, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box sx={{ flex: "auto" }}>
                  <TextField
                    fullWidth
                    label="Название плана"
                    value={
                      product.articles[idCurrentArticle].payment
                        .installmentPlans[index].name
                    }
                    onChange={handleChangeName}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                justifyContent="flex-end"
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Box sx={{ flex: "auto" }}>
                    <TextField
                      fullWidth
                      label="Количество месяцев"
                      value={
                        product.articles[idCurrentArticle].payment
                          .installmentPlans[index].term
                      }
                      onChange={handleChangeTerm}
                    />
                  </Box>
                  <IconButton aria-label="delete" onClick={handleRemove}>
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

export default DraggableListItem;
