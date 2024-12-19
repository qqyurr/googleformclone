import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";
import { CardProps, InputTypes, StateProps } from "../../types";

import CheckboxInput from "../Inputs/CheckboxInput";
import RadioInput from "../Inputs/RadioInput";
import TextFieldInput from "../Inputs/TextFieldInput";
import SelectInput from "../Inputs/SelectInput";
import PreviewCardTitle from "../PreviewCardTitle";

type InputComponentMap = {
  [key in Exclude<InputTypes, InputTypes.TITLE>]: React.ComponentType<Pick<CardProps, "id">>;
};

const InputComponents: InputComponentMap = {
  [InputTypes.TEXT]: TextFieldInput,
  [InputTypes.TEXTAREA]: TextFieldInput,
  [InputTypes.RADIO]: RadioInput,
  [InputTypes.CHECKBOX]: CheckboxInput,
  [InputTypes.SELECT]: SelectInput,
};

const PreviewCard = ({ id }: Pick<CardProps, "id">) => {
  const { inputType, isRequired } = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return {
      inputType: currentCard.inputType,
      isRequired: state.required === id,
    };
  });

  const isTitle = inputType === InputTypes.TITLE;
  const InputComponent =
    inputType !== InputTypes.TITLE
      ? InputComponents[inputType as Exclude<InputTypes, InputTypes.TITLE>]
      : null;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        mt: 2,
        width: 640,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${isRequired ? "error.main" : "grey.400"}`,
          borderRadius: 2,
          backgroundColor: "background.paper",
          minHeight: 131,
          width: 640,
          p: 3,
          boxSizing: "border-box",
        }}
      >
        {isTitle && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 10,
              backgroundColor: "secondary.main",
              zIndex: 20,
            }}
          />
        )}

        <PreviewCardTitle id={id} />

        {InputComponent && <InputComponent id={id} />}

        {isRequired && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              height: 30,
              mt: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "error.main",
              }}
            >
              필수 질문입니다.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PreviewCard;
