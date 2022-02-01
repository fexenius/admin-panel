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

import { useQuery, gql } from "@apollo/client";

const ATTRIBUTES = gql`
  query {
    attributes {
      id
      name
      type
      values
    }
  }
`;

const DraggableListItem = ({
  product,
  setProduct,
  idCurrentArticle,
  item,
  index,
}) => {
  const handleChangeAttribute = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.attributes[index].attribute = event.target.value;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeValue = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.attributes[index].value = event.target.value;
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
    currentArticle.attributes.splice(index, 1);
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const { loading, error, data } = useQuery(ATTRIBUTES);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

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
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="attribute-select-label">
                      Характеристика
                    </InputLabel>

                    <Select
                      labelId="attribute-select-label"
                      id="attribute-select"
                      value={
                        product.articles[idCurrentArticle].attributes[index]
                          .attribute
                      }
                      label="Характеристика"
                      onChange={handleChangeAttribute}
                    >
                      {data.attributes.map((attribute, index) => (
                        <MenuItem
                          value={attribute.id}
                          key={index + attribute.id}
                        >
                          {attribute.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Box sx={{ flex: "auto" }}>
                    <TextField
                      fullWidth
                      label="Значение"
                      value={
                        product.articles[idCurrentArticle].attributes[index]
                          .value
                      }
                      onChange={handleChangeValue}
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
