import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Tooltip, Box, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";

import Card from "../../components/Card";
import AddCardButton from "../../components/AddCardButton";
import { InputTypes, StateProps } from "../../types";
import { moveCard, moveContent } from "../../features/cardSlice";

const Form = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const dispatch = useDispatch();

  const openPreviewTab = () => window.open("/preview", "_blank");

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || (source.droppableId === "card" && destination.index === 0)) return;

    const action =
      source.droppableId === "card"
        ? moveCard({
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        : moveContent({
            cardId: source.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          });

    dispatch(action);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          height: 65,
          width: "100%",
          mb: 2,
          top: 0,
          zIndex: 100,
          backgroundColor: "white",
          borderBottom: "1px solid #B0B0B0",
        }}
      >
        <Tooltip title="미리보기">
          <IconButton
            sx={{
              position: "absolute",
              right: 200,
              width: 30,
              height: 30,
              padding: 1,
              "&:hover": {
                borderRadius: "50%",
                backgroundColor: "#D3D3D3",
              },
            }}
            onClick={openPreviewTab}
          >
            <Visibility sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: "flex", mt: "85px", width: "100%", justifyContent: "center" }}>
          <Droppable droppableId="card" type="card" direction="vertical">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {cards.map((card, idx) => (
                  <Card
                    key={card.id}
                    idx={idx}
                    isTitle={card.inputType === InputTypes.TITLE}
                    {...card}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <AddCardButton />
        </Box>
      </DragDropContext>
    </>
  );
};

export default Form;
