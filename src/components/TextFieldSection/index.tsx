import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { CardProps, InputTypes, StateProps, SelectOptionProps } from "../../types";
import { setText } from "../../features/cardSlice";

const TextFieldSection = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();
  const { control } = useForm();

  const { inputType, contents, isFocused } = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return {
      inputType: currentCard.inputType,
      contents: currentCard.contents as SelectOptionProps[],
      isFocused: currentCard.isFocused,
    };
  });

  const isTitle = inputType === InputTypes.TITLE;

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setText({ cardId: id, text: e.target.value }));

  const getPlaceholder = () => {
    if (isTitle) return "설문지 설명";
    return inputType === InputTypes.TEXT ? "단답형 텍스트" : "장문형 텍스트";
  };

  return (
    <Controller
      name="TextFieldInput"
      control={control}
      render={() => (
        <TextField
          id="standard-basic"
          variant="standard"
          fullWidth={isTitle}
          value={contents}
          onChange={handleDescriptionChange}
          placeholder={getPlaceholder()}
          disabled={!isTitle || !isFocused}
          sx={{
            mt: 2,
            mb: 4,
            width: isTitle ? "100%" : inputType === InputTypes.TEXT ? "50%" : "620px",
            "& .MuiInputBase-root": {
              fontSize: 14,
              "&::before": {
                borderBottom: isTitle
                  ? isFocused
                    ? "1px solid grey.400"
                    : "none"
                  : "1px dotted grey.400",
              },
              "&::after": {
                borderBottom: "2px solid purple.500",
              },
            },
          }}
        />
      )}
    />
  );
};

export default TextFieldSection;
