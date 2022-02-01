import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

function AssetImageItem({
  product,
  setProduct,
  idCurrentArticle,
  file,
  index,
}) {
  const imgElement = React.useRef(null);

  const handleSizeImage = () => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];

    currentArticle.assets[0].images[index].width =
      imgElement.current.naturalWidth;
    currentArticle.assets[0].images[index].height =
      imgElement.current.naturalHeight;

    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeTitle = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];

    currentArticle.assets[0].images[index].title = event.target.value;

    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeWidth = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];

    currentArticle.assets[0].images[index].width = event.target.value;

    currentProduct.articles[idCurrentArticle] = currentArticle;
    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  const handleChangeHeight = (event) => {
    const currentProduct = JSON.parse(JSON.stringify(product));
    const currentArticle = currentProduct.articles[idCurrentArticle];

    currentArticle.assets[0].images[index].height = event.target.value;

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

    currentArticle.assets[0].images.splice(index, 1);

    setProduct((product) => ({
      ...product,
      articles: currentProduct.articles,
    }));
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140px"
        width="auto"
        image={file.preview}
        ref={imgElement}
        onLoad={handleSizeImage}
        alt={file.name}
      />
      <CardContent sx={{ px: 2, py: 1 }}>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Название изображения"
          variant="outlined"
          value={file.title}
          onChange={handleChangeTitle}
        />

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
              label="Ширина"
              variant="outlined"
              value={file.width}
              onChange={handleChangeWidth}
            />
          </Box>
          <Box sx={{ flex: "auto" }}>
            <TextField
              fullWidth
              label="Высота"
              variant="outlined"
              value={file.height}
              onChange={handleChangeHeight}
            />
          </Box>
        </Stack>
      </CardContent>

      <CardActions>
        <Box
          sx={{
            alignItems: "end",
            display: "flex",
            flex: "auto",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mr: 2,
          }}
        >
          <IconButton
            aria-label="remove"
            sx={{ marginLeft: "auto" }}
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default AssetImageItem;
