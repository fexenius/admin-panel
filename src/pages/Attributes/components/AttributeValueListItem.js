import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";
import { TextField, Box, Paper } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableListItem = ({ items, setItems, item, index }) => {
  const handleChangeValue = (event) => {
    const newItems = items.slice();
    item.value = event.target.value;
    newItems[index] = item;
    setItems(newItems);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    const result = Array.from(items);
    result.splice(index, 1);
    setItems(result);
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          disableGutters
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper sx={{ p: 3, width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Box sx={{ flex: "auto" }}>
                <TextField
                  fullWidth
                  label="Значение"
                  value={item.value}
                  onChange={handleChangeValue}
                />
              </Box>
              <IconButton
                aria-label="delete"
                key={item.id}
                value={item.id}
                onClick={handleRemove}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Paper>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
