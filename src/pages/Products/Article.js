import React from "react";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Attribute from "./components/attributes/Attribute";

import Installmet from "./components/installments/Installment";

import AssetsDropzone from "./components/assets/AssetsDropzone";

import { useQuery, gql } from "@apollo/client";

import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";

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
    }
  }
`;

const Article = ({ product, setProduct }) => {
  const [idCurrentArticle, setIdCurrentArticle] = React.useState(0);
  const [percent, setPercent] = React.useState(0);

  const handleChangeVendorCode = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const articles = currentProduct.articles;
    articles[idCurrentArticle].vendorCode = event.target.value;
    setProduct((product) => ({ ...product, articles: articles }));
  };

  const handleChangeModel = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.model = event.target.value;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangePrice = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.price = Number(event.target.value);
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeCurency = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.curency = Number(event.target.value);
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeQuantity = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];

    if (Number(event.target.value) > 0) {
      currentArticle.stockStatus = true;
      currentProduct.articles[idCurrentArticle] = currentArticle;
      setProduct((product) => ({
        ...product,
        articles: currentProduct.articles,
      }));
    } else {
      currentArticle.stockStatus = false;
      currentProduct.articles[idCurrentArticle] = currentArticle;
      setProduct((product) => ({
        ...product,
        articles: currentProduct.articles,
      }));
    }
    currentArticle.quantity = Number(event.target.value);
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleStockStatus = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.stockStatus = event.target.checked;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeDiscount = (event) => {
    data.discounts.forEach((discount, index) => {
      if (discount.id === event.target.value) {
        setPercent(discount.percent);
      }
    });

    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.discount = event.target.value;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleCashlessStatus = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.payment.isCashless = event.target.checked;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleCreditStatus = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.payment.isCredit = event.target.checked;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeArticle = (event) => {
    const articles = JSON.parse(JSON.stringify(product.articles));

    setIdCurrentArticle(event.target.value);

    setProduct((product) => ({
      ...product,
      articles: articles,
    }));
  };

  const handleAddArticle = (event) => {
    const articles = JSON.parse(JSON.stringify(product.articles));

    const index = articles.length;

    articles[articles.length - 1] = JSON.parse(
      JSON.stringify(product.articles[idCurrentArticle])
    );

    const emptyArticle = JSON.parse(
      JSON.stringify({
        vendorCode: "",
        model: "",
        price: 0,
        curency: "BYN",
        attributes: [],
        assets: [{ images: [] }],
        discount: 0,
        payment: {
          isCashless: false,
          isCredit: false,
          installmentPlans: [],
        },
        quantity: 0,

        stockStatus: false,
      })
    );

    articles.push(emptyArticle);

    setProduct((product) => ({
      ...product,
      articles: articles,
    }));

    setIdCurrentArticle(index);
  };

  const { loading, error, data } = useQuery(DISCOUNTS);

  if (loading) return <Loading />;
  if (error) return <Error />;

  let articleForm = <></>;

  if (product.articles.length > 0) {
    articleForm = (
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          label="Код товара"
          required
          value={product.articles[idCurrentArticle].vendorCode}
          onChange={handleChangeVendorCode}
          variant="outlined"
        />
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Модель"
            required
            value={product.articles[idCurrentArticle].model}
            onChange={handleChangeModel}
            variant="outlined"
          />
        </Box>

        <Stack
          sx={{ mt: 3 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ flex: "auto" }}>
            <TextField
              fullWidth
              label="Цена"
              required
              value={product.articles[idCurrentArticle].price}
              onChange={handleChangePrice}
              variant="outlined"
            />
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="currency-select-label">Валюта</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={product.articles[idCurrentArticle].curency}
                label="Валюта"
                defaultValue={"BYN"}
                onChange={handleChangeCurency}
              >
                <MenuItem key="0" value={"BYN"}>
                  BYN
                </MenuItem>
                <MenuItem key="1" value={"USD"}>
                  USD
                </MenuItem>
                <MenuItem key="2" value={"EUR"}>
                  EUR
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack
          sx={{ mt: 3 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ flex: "auto" }}>
            <TextField
              fullWidth
              label="Количество"
              required
              value={product.articles[idCurrentArticle].quantity}
              onChange={handleChangeQuantity}
            />
          </Box>
          <Box>
            <FormControlLabel
              label="Наличие на складе"
              control={
                <Checkbox
                  checked={product.articles[idCurrentArticle].stockStatus}
                  onChange={handleStockStatus}
                  inputProps={{ "aria-label": "Наличие на складе" }}
                />
              }
            />
          </Box>
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
            <Typography variant="h6">Ресурсы</Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            {
              <AssetsDropzone
                product={product}
                setProduct={setProduct}
                idCurrentArticle={idCurrentArticle}
              />
            }
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Attribute
            product={product}
            setProduct={setProduct}
            idCurrentArticle={idCurrentArticle}
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
            <Typography variant="h6">Скидка</Typography>
          </Box>
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Выберите скидку
              </InputLabel>
              <Select
                sx={{ bgcolor: "#fff" }}
                labelId="discount-select-label"
                id="discount-select"
                label="Выберите скидку"
                value={product.articles[idCurrentArticle].discount}
                onChange={handleChangeDiscount}
              >
                {data.discounts.map((discount) => (
                  <MenuItem key={discount.id} value={discount.id}>
                    {discount.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Paper sx={{ mt: 3, p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="body" sx={{ minWidth: 180 }} gutterBottom>
                Цена с учётом скидки
              </Typography>
              <TextField
                fullWidth
                label="Цена"
                disabled
                value={
                  product.articles[idCurrentArticle].price -
                  (product.articles[idCurrentArticle].price * Number(percent)) /
                    100
                }
              />
              <TextField
                fullWidth
                label="Валюта"
                disabled
                value={product.articles[idCurrentArticle].curency}
              />
            </Stack>
          </Paper>
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
            <Typography variant="h6">Оплата</Typography>
          </Box>
          <Paper sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6">Возможности оплаты</Typography>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <FormControlLabel
                  label="Безналичная оплата"
                  control={
                    <Checkbox
                      checked={
                        product.articles[idCurrentArticle].payment.isCashless
                      }
                      onChange={handleCashlessStatus}
                    />
                  }
                />
              </Box>
              <Box>
                <FormControlLabel
                  label="Оплата в кредит"
                  control={
                    <Checkbox
                      checked={
                        product.articles[idCurrentArticle].payment.isCredit
                      }
                      onChange={handleCreditStatus}
                    />
                  }
                />
              </Box>
            </Stack>
            <Installmet
              product={product}
              setProduct={setProduct}
              idCurrentArticle={idCurrentArticle}
            />
          </Paper>
        </Box>
      </Grid>
    );
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Артикул
              </Typography>
              <Typography sx={{ mt: 2 }} variant="body" gutterBottom>
                Артикул содержит инфориацию о конкретном товаре, со своим
                списком характеристик и способами оплаты. Один продукт может
                иметь несколько артикулов.
              </Typography>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="currency-select-label">
                  Выбор артикула
                </InputLabel>
                <Select
                  value={idCurrentArticle}
                  label="Выбор артикула"
                  onChange={handleChangeArticle}
                >
                  {product.articles.map((article, id) => (
                    <MenuItem key={id} value={id}>
                      {article.vendorCode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack
                sx={{ mt: 3 }}
                direction="row"
                alignItems="center"
                flexWrap="wrap"
              >
                <Button
                  sx={{ mt: 2, mr: 2, minWidth: 240 }}
                  size="large"
                  color="success"
                  variant="contained"
                  onClick={handleAddArticle}
                  startIcon={<AddIcon />}
                >
                  Добавить артикул
                </Button>
                <Button
                  sx={{ mt: 2, mr: 2, minWidth: 240 }}
                  size="large"
                  color="warning"
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                >
                  Копировать артикул
                </Button>
                <Button
                  sx={{ mt: 2, mr: 2, minWidth: 240 }}
                  size="large"
                  color="error"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                >
                  Удалить артикул
                </Button>
              </Stack>
              <Divider sx={{ my: 3 }} />
            </Grid>
            {articleForm}
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Article;
