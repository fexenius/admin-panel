import React from "react";
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useQuery, useMutation, gql } from "@apollo/client";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

import Article from "./Article";

const CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

const PRODUCT_MUTATION = gql`
  mutation(
    $category: ID!
    $name: String!
    $articles: [ArticleInput]
    $vendor: VendorInput!
    $description: String
    $producer: [ProducerInput]
    $importers: [ImporterInput]
    $warranty: Int
    $productLifeTime: Int
    $serviceCenters: [ServiceCenterInput]
  ) {
    createFullProduct(
      product: {
        category: $category
        name: $name
        articles: $articles
        vendor: $vendor
        description: $description
        producer: $producer
        importers: $importers
        warranty: $warranty
        productLifeTime: $productLifeTime
        serviceCenters: $serviceCenters
      }
    ) {
      id
    }
  }
`;

const AddProduct = (props) => {
  const [product, setProduct] = React.useState({
    category: "",
    name: "",
    articles: [
      {
        vendorCode: "",
        model: "",
        price: 0,
        curency: "BYN",
        attributes: [],
        assets: [{ images: [] }],
        discount: "",
        payment: {
          isCashless: false,
          isCredit: false,
          installmentPlans: [],
        },
        quantity: 0,

        stockStatus: false,
      },
    ],
    vendor: { name: "" },
    description: "",
    producer: [{ name: "", address: "" }],
    importers: [{ name: "", address: "" }],
    warranty: 0,
    productLifeTime: 0,
    serviceCenters: [{ name: "", address: "" }],
  });

  const handleChangeCategory = (event) => {
    setProduct((product) => ({ ...product, category: event.target.value }));
  };

  const handleChangeName = (event) => {
    setProduct((product) => ({ ...product, name: event.target.value }));
  };

  const handleChangeDescription = (event) => {
    setProduct((product) => ({ ...product, description: event.target.value }));
  };

  const handleChangeWarranty = (event) => {
    setProduct((product) => ({
      ...product,
      warranty: Number(event.target.value),
    }));
  };

  const handleChangeLifeTime = (event) => {
    setProduct((product) => ({
      ...product,
      productLifeTime: Number(event.target.value),
    }));
  };

  const handleChangeVendorName = (event) => {
    const vendor = JSON.parse(JSON.stringify(product.vendor));
    vendor.name = event.target.value;

    setProduct((product) => ({
      ...product,
      vendor: vendor,
    }));
  };

  const handleChangeProducerName = (event) => {
    const producer = JSON.parse(JSON.stringify(product.producer));
    producer[0].name = event.target.value;

    setProduct((product) => ({
      ...product,
      producer: producer,
    }));
  };

  const handleChangeProducerAddress = (event) => {
    const producer = JSON.parse(JSON.stringify(product.producer));
    producer[0].address = event.target.value;

    setProduct((product) => ({
      ...product,
      producer: producer,
    }));
  };

  const handleChangeImporterName = (event) => {
    const importers = JSON.parse(JSON.stringify(product.importers));
    importers[0].name = event.target.value;

    setProduct((product) => ({
      ...product,
      importers: importers,
    }));
  };

  const handleChangeImporterAddress = (event) => {
    const importers = JSON.parse(JSON.stringify(product.importers));
    importers[0].address = event.target.value;

    setProduct((product) => ({
      ...product,
      importers: importers,
    }));
  };

  const handleChangeServiceCenterName = (event) => {
    const serviceCenters = JSON.parse(JSON.stringify(product.serviceCenters));
    serviceCenters[0].name = event.target.value;

    setProduct((product) => ({
      ...product,
      serviceCenters: serviceCenters,
    }));
  };

  const handleChangeServiceCenterAddress = (event) => {
    const serviceCenters = JSON.parse(JSON.stringify(product.serviceCenters));
    serviceCenters[0].address = event.target.value;

    setProduct((product) => ({
      ...product,
      serviceCenters: serviceCenters,
    }));
  };

  const [addProduct] = useMutation(PRODUCT_MUTATION);

  async function handleSaveProduct(event) {
    event.preventDefault();

    product.articles.forEach((article, index) => {
      product.articles[index] = clearArticle(article);
    });

    await addProduct({ variables: product });

    alert(JSON.stringify(product));
  }

  function clearArticle(oldArticle) {
    const newArticle = JSON.parse(JSON.stringify(oldArticle));
    newArticle.attributes.forEach((attribute) => {
      delete attribute.id;
    });
    newArticle.assets[0].images.forEach((image) => {
      delete image.preview;
    });
    newArticle.payment.installmentPlans.forEach((installmentPlan) => {
      delete installmentPlan.id;
    });
    return newArticle;
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
              Добавить продукт
            </Typography>
          </Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Основная информация
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body" gutterBottom>
                  Основная инфомация содержит общие данные для всех артикулов
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Название продукта"
                  name="name"
                  required
                  variant="outlined"
                  value={product.name}
                  onChange={handleChangeName}
                />
                <Box sx={{ minWidth: 120, mt: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="attribute-select-label">
                      Категория продукта
                    </InputLabel>

                    <Select
                      labelId="attribute-select-label"
                      id="attribute-select"
                      label="Родительская категория"
                      value={product.category}
                      onChange={handleChangeCategory}
                    >
                      {data.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Описание продукта"
                    multiline
                    required
                    rows={6}
                    value={product.description}
                    onChange={handleChangeDescription}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Изготовитель"
                    required
                    value={product.vendor.name}
                    onChange={handleChangeVendorName}
                  />
                </Box>
                <Stack sx={{ mt: 3 }} spacing={2} direction="row">
                  <TextField
                    fullWidth
                    label="Гарантия"
                    required
                    value={product.warranty}
                    onChange={handleChangeWarranty}
                  />
                  <TextField
                    fullWidth
                    label="Срок службы"
                    required
                    value={product.productLifeTime}
                    onChange={handleChangeLifeTime}
                  />
                </Stack>

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
                    <Typography variant="h6">Производитель</Typography>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper>
                          <TextField
                            fullWidth
                            label="Название"
                            name="name"
                            required
                            variant="outlined"
                            value={product.producer[0].name}
                            onChange={handleChangeProducerName}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper>
                          <TextField
                            fullWidth
                            label="Адрес"
                            required
                            variant="outlined"
                            value={product.producer[0].address}
                            onChange={handleChangeProducerAddress}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
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
                    <Typography variant="h6">Импортёр</Typography>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper>
                          <TextField
                            fullWidth
                            label="Название"
                            name="name"
                            required
                            variant="outlined"
                            value={product.importers[0].name}
                            onChange={handleChangeImporterName}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper>
                          <TextField
                            fullWidth
                            label="Адрес"
                            required
                            variant="outlined"
                            value={product.importers[0].address}
                            onChange={handleChangeImporterAddress}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
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
                    <Typography variant="h6">Сервисный центр</Typography>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper>
                          <TextField
                            fullWidth
                            label="Название"
                            name="name"
                            required
                            variant="outlined"
                            value={product.serviceCenters[0].name}
                            onChange={handleChangeServiceCenterName}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper>
                          <TextField
                            fullWidth
                            label="Адрес"
                            required
                            variant="outlined"
                            value={product.serviceCenters[0].address}
                            onChange={handleChangeServiceCenterAddress}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Article product={product} setProduct={setProduct} />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{ marginLeft: "auto" }}
              onClick={handleSaveProduct}
            >
              Сохранить Продукт
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AddProduct;
