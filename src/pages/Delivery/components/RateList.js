import * as React from "react";
import RateListItem from "./RateListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DraggableList = React.memo(({ items, setItems, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <RateListItem
                items={items}
                setItems={setItems}
                item={item}
                index={index}
                key={item.ids}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
