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
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export const GridCategories = ({ categories, ...rest }) => {
  const [selectedDiscountIds, setSelectedDiscountIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDiscountIds;

    if (event.target.checked) {
      newSelectedDiscountIds = categories.map((category) => category.id);
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
                    checked={selectedDiscountIds.length === categories.length}
                    color="primary"
                    indeterminate={
                      selectedDiscountIds.length > 0 &&
                      selectedDiscountIds.length < categories.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Родительская категория</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.slice(0, limit).map((category) => (
                <TableRow
                  hover
                  key={category.id}
                  selected={selectedDiscountIds.indexOf(category.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDiscountIds.indexOf(category.id) !== -1}
                      onChange={(event) => handleSelectOne(event, category.id)}
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
                        {category.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category.parrent && category.parrent.name}
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
        count={categories.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GridCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default GridCategories;
