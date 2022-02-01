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

import { useQuery, useMutation, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

const CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

const DISCOUNT_MUTATION = gql`
  mutation($name: String, $parrent: ID) {
    createCategory(category: { name: $name, parrent: $parrent }) {
      id
    }
  }
`;

const AddCategory = (props) => {
  const [category, setCategory] = React.useState({
    name: "",
    parrent: "",
  });

  const [addCategory] = useMutation(DISCOUNT_MUTATION);

  const handleChangeName = (event) => {
    setCategory((category) => ({ ...category, name: event.target.value }));
  };

  const handleChangeParrent = (event) => {
    setCategory((category) => ({ ...category, parrent: event.target.value }));
  };

  async function handleSaveCategory(event) {
    event.preventDefault();

    await addCategory({
      variables: {
        name: category.name,
        parrent: category.parrent,
      },
    });
  }

  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <Loading />;
  if (error) return <Error />;

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
              Добавить категорию
            </Typography>
          </Box>

          <Paper>
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Категория
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Название категрии"
                  name="name"
                  required
                  variant="outlined"
                  value={category.name}
                  onChange={handleChangeName}
                />

                <Box sx={{ minWidth: 120, mt: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="attribute-select-label">
                      Родительская категория
                    </InputLabel>

                    <Select
                      labelId="attribute-select-label"
                      id="attribute-select"
                      label="Родительская категория"
                      value={category.parrent}
                      onChange={handleChangeParrent}
                    >
                      {data.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                onClick={handleSaveCategory}
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

export default AddCategory;
