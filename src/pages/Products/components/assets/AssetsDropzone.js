import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import AssetImageItem from "./AssetImageItem";

import { useDropzone } from "react-dropzone";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function AssetsDropzone({ product, setProduct, idCurrentArticle }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/gif",
    onDrop: (acceptedFiles) => {
      const filePreview = Array.from( product.articles[idCurrentArticle].assets);

      acceptedFiles.forEach((acceptedFile) => {
        const file = {
          preview: URL.createObjectURL(acceptedFile),
          src: acceptedFile.path,
          title: acceptedFile.name,
          width: "10",
          height: "10",
        };

        filePreview[0].images.push(file);
      });

      const currentProduct = JSON.parse(JSON.stringify(product));
      const currentArticle = currentProduct.articles[idCurrentArticle];
      currentArticle.assets = filePreview;
      currentProduct.articles[idCurrentArticle] = currentArticle;
      setProduct((product) => ({ ...product, articles: currentProduct.articles }));

    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = product.articles[idCurrentArticle].assets[0].images.map((file, index) => (
    <AssetImageItem
      product={product}
      setProduct={setProduct}
      idCurrentArticle={idCurrentArticle}
      file={file}
      index={index}
      key={file.src+index}
    />
  ));

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Перетащите сюда изображение продукта</div>
      </div>
      <Box
        sx={{
          display: "flex",
          flex: "auto",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {thumbs}
      </Box>
    </section>
  );
}

export default AssetsDropzone;
