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

export const GridAttributes = ({ attributes, ...rest }) => {
  const [selectedAttributeIds, setSelectedAttributeIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedAttributeIds;

    if (event.target.checked) {
      newSelectedAttributeIds = attributes.map((attribute) => attribute.id);
    } else {
      newSelectedAttributeIds = [];
    }

    setSelectedAttributeIds(newSelectedAttributeIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAttributeIds.indexOf(id);
    let newSelectedAttributeIds = [];

    if (selectedIndex === -1) {
      newSelectedAttributeIds = newSelectedAttributeIds.concat(
        selectedAttributeIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedAttributeIds = newSelectedAttributeIds.concat(
        selectedAttributeIds.slice(1)
      );
    } else if (selectedIndex === selectedAttributeIds.length - 1) {
      newSelectedAttributeIds = newSelectedAttributeIds.concat(
        selectedAttributeIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedAttributeIds = newSelectedAttributeIds.concat(
        selectedAttributeIds.slice(0, selectedIndex),
        selectedAttributeIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAttributeIds(newSelectedAttributeIds);
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
                    checked={selectedAttributeIds.length === attributes.length}
                    color="primary"
                    indeterminate={
                      selectedAttributeIds.length > 0 &&
                      selectedAttributeIds.length < attributes.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Категория</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attributes.slice(0, limit).map((attribute) => (
                <TableRow
                  hover
                  key={attribute.id}
                  selected={selectedAttributeIds.indexOf(attribute.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedAttributeIds.indexOf(attribute.id) !== -1
                      }
                      onChange={(event) => handleSelectOne(event, attribute.id)}
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
                        {attribute.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{attribute.type}</TableCell>
                  <TableCell>{attribute.category.name}</TableCell>
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
        count={attributes.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GridAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
};

export default GridAttributes;
