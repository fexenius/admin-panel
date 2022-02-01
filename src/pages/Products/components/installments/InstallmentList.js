import * as React from "react";
import InstallmentListItem from "./InstallmentListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DraggableList = React.memo(
  ({ product, setProduct, idCurrentArticle, onDragEnd }) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {product.articles[idCurrentArticle].payment.installmentPlans.map(
                (item, index) => (
                  <InstallmentListItem
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
