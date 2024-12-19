import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Box, Paper } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";

import { CardProps, InputTypes, StateProps } from "../../types";
import { setCardFocus } from "../../features/cardSlice";
import CardFooter from "./Footer";
import CardHeader from "./Header";
import SelectOptionConfigureSection from "../SelectOptionConfigureSection";
import TextFieldSection from "../TextFieldSection";

export interface ExtendedCardProps extends CardProps {
  isTitle: boolean;
  idx: number;
}

const Card = ({ isTitle, id, idx }: ExtendedCardProps) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = React.useState(false);

  const isFocused = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isFocused;
  }, shallowEqual);

  const { inputType } = useSelector(
    (state: StateProps) => state.cards.find((card) => card.id === id) as CardProps,
    shallowEqual,
  );

  const setIsFocused = () => {
    if (!isFocused) dispatch(setCardFocus({ id }));
  };

  return (
    <Draggable draggableId={id} index={idx} key={id}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          data-index={idx}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: isFocused ? "0 3px 5px rgba(0, 0, 0, 0.3)" : undefined,
          }}
        >
          <Paper
            onClick={setIsFocused}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #B0B0B0",
              borderRadius: 2,
              backgroundColor: "white",
              minHeight: 138,
              width: 768,
              p: 3,
              pb: isFocused && !isTitle ? 0 : undefined,
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            {isTitle ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 10,
                  backgroundColor: "#6A1B9A",
                  zIndex: 20,
                }}
              />
            ) : (
              <Box
                {...provided.dragHandleProps}
                sx={{
                  display: "flex",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 30,
                  zIndex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "rotate(90deg)",
                  visibility: isHovered || isFocused ? "visible" : "hidden",
                }}
              >
                <DragIndicator sx={{ fontSize: 24, color: "#B0B0B0" }} />
              </Box>
            )}

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 6,
                minHeight: "100%",
                backgroundColor: isFocused ? "#1565C0" : undefined,
                zIndex: 10,
              }}
            />

            <CardHeader isTitle={isTitle} id={id} />

            {inputType === InputTypes.TEXT || inputType === InputTypes.TEXTAREA ? (
              <TextFieldSection id={id} />
            ) : (
              <SelectOptionConfigureSection id={id} />
            )}

            {isFocused && !isTitle && <CardFooter id={id} />}
          </Paper>
        </Box>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
