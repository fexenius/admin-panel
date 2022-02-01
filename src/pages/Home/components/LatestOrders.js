import PerfectScrollbar from "react-perfect-scrollbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const orders = [
  {
    id: 1,
    ref: "1",
    amount: 30.5,
    customer: {
      name: "Покупатель 1",
    },
    createdAt: 1640080001000,
    status: "Обработка",
  },
  {
    id: 2,
    ref: "2",
    amount: 25.1,
    customer: {
      name: "Покупатель 2",
    },
    createdAt: 1640008100000,
    status: "Доставка",
  },
];

export const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Последние заказы" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Покупатель</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Сортировка">
                  <TableSortLabel active direction="desc">
                    Дата
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.ref}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>
                  {new Date(Number(order.createdAt)).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={order.status}
                      variant="outlined"
                      color="success"
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        Посмотреть все
      </Button>
    </Box>
  </Card>
);
