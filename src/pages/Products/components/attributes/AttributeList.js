import * as React from "react";
import AttributeListItem from "./AttributeListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DraggableList = React.memo(
  ({ product, setProduct, idCurrentArticle, onDragEnd }) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {product.articles[idCurrentArticle].attributes.map(
                (item, index) => (
                  <AttributeListItem
                    product={product}
                    setProduct={setProduct}
                    idCurrentArticle={idCurrentArticle}
                    item={item}
                    index={index}
                    key={item.id}
                  />
                )
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default DraggableList;
