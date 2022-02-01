import { useState } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Card from "@mui/material/Card";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export const GridProducts = ({ products, ...rest }) => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProductIds;

    if (event.target.checked) {
      newSelectedProductIds = products.map((product) => product.id);
    } else {
      newSelectedProductIds = [];
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(1)
      );
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProductIds.length === products.length}
                    color="primary"
                    indeterminate={
                      selectedProductIds.length > 0 &&
                      selectedProductIds.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Количество</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Последнее обновление</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(0, limit).map((product) => (
                <TableRow
                  hover
                  key={product.id}
                  selected={selectedProductIds.indexOf(product.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductIds.indexOf(product.id) !== -1}
                      onChange={(event) => handleSelectOne(event, product.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.articles[0].price}</TableCell>
                  <TableCell>{product.articles[0].quantity}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={
                          (product.articles[0].stockStatus === true &&
                            "В наличии") ||
                          (product.articles[0].stockStatus === false &&
                            "Нет в наличии") ||
                          "warning"
                        }
                        color={
                          (product.articles[0].stockStatus === true &&
                            "success") ||
                          (product.articles[0].stockStatus === false &&
                            "error") ||
                          "warning"
                        }
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {new Date(Number(product.lastUpdate)).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        labelRowsPerPage={"Количество"}
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}–${to} из ${
            count !== -1 ? count : `больше, чем ${to}`
          }`;
        }}
        count={products.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GridProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default GridProducts;
