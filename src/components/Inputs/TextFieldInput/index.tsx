import React from "react";
import { useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box } from "@mui/material";

import { CardProps, StateProps, InputTypes } from "../../../types";

const TextFieldInput = ({ id }: Pick<CardProps, "id">) => {
  const { control } = useFormContext();

  const inputType = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.inputType;
  });

  const textFieldWidth = inputType === InputTypes.TEXT ? 295 : 590;

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange } }) => (
        <Box sx={{ width: textFieldWidth }}>
          <TextField
            onChange={onChange}
            variant="standard"
            placeholder="내 답변"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
              "&:before": {
                borderBottom: "1px solid #B0B0B0 !important",
              },
              "&:after": {
                borderBottom: "2px solid #6A1B9A",
              },
            }}
          />
        </Box>
      )}
    />
  );
};

export default TextFieldInput;
