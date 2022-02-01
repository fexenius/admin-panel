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

export const GridDiscounts = ({ discounts, ...rest }) => {
  const [selectedDiscountIds, setSelectedDiscountIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDiscountIds;

    if (event.target.checked) {
      newSelectedDiscountIds = discounts.map((discount) => discount.id);
    } else {
      newSelectedDiscountIds = [];
    }

    setSelectedDiscountIds(newSelectedDiscountIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDiscountIds.indexOf(id);
    let newSelectedDiscountIds = [];

    if (selectedIndex === -1) {
      newSelectedDiscountIds = newSelectedDiscountIds.concat(
        selectedDiscountIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedDiscountIds = newSelectedDiscountIds.concat(
        selectedDiscountIds.slice(1)
      );
    } else if (selectedIndex === selectedDiscountIds.length - 1) {
      newSelectedDiscountIds = newSelectedDiscountIds.concat(
        selectedDiscountIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDiscountIds = newSelectedDiscountIds.concat(
        selectedDiscountIds.slice(0, selectedIndex),
        selectedDiscountIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDiscountIds(newSelectedDiscountIds);
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
                    checked={selectedDiscountIds.length === discounts.length}
                    color="primary"
                    indeterminate={
                      selectedDiscountIds.length > 0 &&
                      selectedDiscountIds.length < discounts.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Размер скидки (%)</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Период действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.slice(0, limit).map((discount) => (
                <TableRow
                  hover
                  key={discount.id}
                  selected={selectedDiscountIds.indexOf(discount.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDiscountIds.indexOf(discount.id) !== -1}
                      onChange={(event) => handleSelectOne(event, discount.id)}
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
                        {discount.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{discount.percent}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={
                          (discount.active === true && "Активна") ||
                          (discount.active === false && "Не активна") ||
                          "warning"
                        }
                        color={
                          (discount.active === true && "success") ||
                          (discount.actives === false && "error") ||
                          "error"
                        }
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {new Date(Number(discount.validity.start)).toLocaleString()}{" "}
                    -{new Date(Number(discount.validity.end)).toLocaleString()}
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
        count={discounts.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GridDiscounts.propTypes = {
  discounts: PropTypes.array.isRequired,
};

export default GridDiscounts;
