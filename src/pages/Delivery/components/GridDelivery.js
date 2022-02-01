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

export const GridDelivery = ({ delivery, ...rest }) => {
  const [selectedDeliveryIds, setSelectedDeliveryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDeliveryIds;

    if (event.target.checked) {
      newSelectedDeliveryIds = delivery.map((delivery) => delivery.id);
    } else {
      newSelectedDeliveryIds = [];
    }

    setSelectedDeliveryIds(newSelectedDeliveryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDeliveryIds.indexOf(id);
    let newSelectedDeliveryIds = [];

    if (selectedIndex === -1) {
      newSelectedDeliveryIds = newSelectedDeliveryIds.concat(
        selectedDeliveryIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedDeliveryIds = newSelectedDeliveryIds.concat(
        selectedDeliveryIds.slice(1)
      );
    } else if (selectedIndex === selectedDeliveryIds.length - 1) {
      newSelectedDeliveryIds = newSelectedDeliveryIds.concat(
        selectedDeliveryIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDeliveryIds = newSelectedDeliveryIds.concat(
        selectedDeliveryIds.slice(0, selectedIndex),
        selectedDeliveryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDeliveryIds(newSelectedDeliveryIds);
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
                    checked={selectedDeliveryIds.length === delivery.length}
                    color="primary"
                    indeterminate={
                      selectedDeliveryIds.length > 0 &&
                      selectedDeliveryIds.length < delivery.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Количество дней доставки по городу</TableCell>
                <TableCell>Количество дней доставки по стране</TableCell>
                <TableCell>Последние изменение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {delivery.slice(0, limit).map((delivery) => (
                <TableRow
                  hover
                  key={delivery.id}
                  selected={selectedDeliveryIds.indexOf(delivery.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDeliveryIds.indexOf(delivery.id) !== -1}
                      onChange={(event) => handleSelectOne(event, delivery.id)}
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
                        {delivery.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{delivery.townTime}</TableCell>
                  <TableCell>{delivery.countryTime}</TableCell>
                  <TableCell>
                    {new Date(
                      Number(delivery.lastUpdate.date)
                    ).toLocaleString()}
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
        count={delivery.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GridDelivery.propTypes = {
  delivery: PropTypes.array.isRequired,
};

export default GridDelivery;
