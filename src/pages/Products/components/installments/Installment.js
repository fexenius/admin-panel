import * as React from "react";
import { Button, Box, Typography } from "@mui/material";
import InstallmentList from "./InstallmentList";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Installment = ({ product, setProduct, idCurrentArticle }) => {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newItems = reorder(
      product.articles[idCurrentArticle].payment.installmentPlans,
      source.index,
      destination.index
    );

    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.payment.installmentPlans = newItems;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          my: 2,
        }}
      >
        <Typography variant="h6">Оплата в рассрочку</Typography>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginLeft: "auto" }}
          onClick={(event) => {
            const id =
              product.articles[idCurrentArticle].payment.installmentPlans
                .length;
            const rand = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
            let item = {
              id: id + 1 + "|+|" + rand,
              name: "",
              term: 0,
            };

            let newItems = product.articles[
              idCurrentArticle
            ].payment.installmentPlans.slice();

            newItems.push(item);

            const currentProduct = JSON.parse(JSON.stringify(product));
            const currentArticle = currentProduct.articles[idCurrentArticle];
            currentArticle.payment.installmentPlans = newItems;
            currentProduct.articles[idCurrentArticle] = currentArticle;
            setProduct((product) => ({
              ...product,
              articles: currentProduct.articles,
            }));
          }}
        >
          Добавить рассрочку
        </Button>
      </Box>
      <InstallmentList
        product={product}
        setProduct={setProduct}
        idCurrentArticle={idCurrentArticle}
        onDragEnd={onDragEnd}
      />
    </>
  );
};

export default Installment;
