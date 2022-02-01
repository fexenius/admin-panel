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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import AttributeValueList from "./components/AttributeValueList";

import Autocomplete from "@mui/material/Autocomplete";

import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useMutation, useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
  query {
    attributes {
      category {
        name
      }
    }
  }
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const AddAttribute = (props) => {
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [inputCategory, setInputCategory] = React.useState(" ");
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [items, setItems] = React.useState([]);

  const ATTRIBUTE_MUTATION = gql`
    mutation(
      $name: String!
      $category: String!
      $description: String
      $type: String
      $values: [String]
    ) {
      createAttribte(
        attribute: {
          name: $name
          category: { name: $category }
          description: $description
          type: $type
          values: $values
        }
      ) {
        id
      }
    }
  `;

  const [addAttribute] = useMutation(ATTRIBUTE_MUTATION);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleAddValue = (event) => {
    const id = items.length;
    const rand = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    let newItems = items.slice();
    newItems.push({
      id: id + 1 + "|" + rand,
      value: " ",
    });
    setItems(newItems);
  };

  async function handleSaveAttribute(event) {
    event.preventDefault();

    let valuesA = [];

    items.forEach((item) => {
      valuesA.push(item.value);
    });

    await addAttribute({
      variables: {
        name: name,
        category: category,
        description: description,
        type: type,
        values: valuesA,
      },
    });
    console.log(error);
  }

  const { loading, error, data } = useQuery(CATEGORY);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const setCategories = new Set();
  if (data) {
    data.attributes.forEach((attribute) => {
      setCategories.add(attribute.category.name);
    });
  }

  const categories = Array.from(setCategories);

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
              Добавить характеристику
            </Typography>
          </Box>

          <Paper>
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Характеристика
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Название"
                  name="name"
                  required
                  variant="outlined"
                  value={name}
                  onChange={handleChangeName}
                />
                <Box sx={{ mt: 3 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-category"
                    value={category}
                    onChange={(event, newCategory) => {
                      setCategory(newCategory);
                    }}
                    inputcategory={inputCategory}
                    onInputChange={(event, newInputCategory) => {
                      setInputCategory(newInputCategory);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={categories}
                    noOptionsText="Категории не существует"
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Категория" />
                    )}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Описание характеристики"
                    multiline
                    required
                    rows={6}
                    value={description}
                    onChange={handleChangeDescription}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Тип характеристики
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Тип характеристики"
                      onChange={handleChangeType}
                    >
                      <MenuItem value={"Text"}>Текстовая</MenuItem>
                      <MenuItem value={"Number"}>Числовая</MenuItem>
                      <MenuItem value={"Boolean"}>Логическая</MenuItem>
                      <MenuItem value={"Color"}>Цветовая</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    bgcolor: "background.container",
                    boxShadow: 1,
                    borderRadius: 1,
                    p: 2,
                    mt: 3
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
                  <AttributeValueList
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
                onClick={handleSaveAttribute}
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

export default AddAttribute;
