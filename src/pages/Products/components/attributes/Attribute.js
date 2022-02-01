import * as React from "react";
import { Button, Box, Typography } from "@mui/material";
import AttributeList from "./AttributeList";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Attribute = ({ product, setProduct, idCurrentArticle }) => {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newItems = reorder(
      product.articles[idCurrentArticle].attributes,
      source.index,
      destination.index
    );

    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];
    currentArticle.attributes = newItems;
    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  return (
    <Box
      sx={{
        bgcolor: "background.container",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
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
        <Typography variant="h6">Характеристики</Typography>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginLeft: "auto" }}
          onClick={(event) => {
            const id = product.articles[idCurrentArticle].attributes.length;
            const rand = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
            let item = {
              id: id + 1 + "|" + rand,
              attribute: "",
              value: "",
            };

            let newItems = product.articles[
              idCurrentArticle
            ].attributes.slice();

            newItems.push(item);

            const currentProduct = JSON.parse(JSON.stringify(product));
            const currentArticle = currentProduct.articles[idCurrentArticle];
            currentArticle.attributes = newItems;
            currentProduct.articles[idCurrentArticle] = currentArticle;
            setProduct((product) => ({
              ...product,
              articles: currentProduct.articles,
            }));
          }}
        >
          Добавить характеристику
        </Button>
      </Box>
      <AttributeList
        product={product}
        setProduct={setProduct}
        idCurrentArticle={idCurrentArticle}
        onDragEnd={onDragEnd}
      />
    </Box>
  );
};

export default Attribute;
