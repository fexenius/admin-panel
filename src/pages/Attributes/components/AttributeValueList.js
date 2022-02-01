import * as React from "react";
import AttributeValueListItem from "./AttributeValueListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DraggableList = React.memo(({ items, setItems, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <AttributeValueListItem items={items} setItems={setItems} item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
