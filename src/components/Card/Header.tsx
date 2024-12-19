import React from "react";
import { MenuItem, TextField, Select, SelectChangeEvent, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { CardProps, StateProps, InputTypes } from "../../types";

import { setTitle, updateCardType } from "../../features/cardSlice";
import { ExtendedCardProps } from ".";

const inputTypeLabels: Omit<Record<InputTypes, string>, InputTypes.TITLE> = {
  [InputTypes.TEXT]: "단답형",
  [InputTypes.TEXTAREA]: "장문형",
  [InputTypes.RADIO]: "객관식 질문",
  [InputTypes.CHECKBOX]: "체크박스",
  [InputTypes.SELECT]: "드롭다운",
};

const CardHeader = ({ id, isTitle }: Pick<ExtendedCardProps, "id" | "isTitle">) => {
  const { control, register } = useForm();
  const dispatch = useDispatch();

  const card = useSelector(
    (state: StateProps) => state.cards.find((card) => card.id === id) as CardProps,
    shallowEqual,
  );

  const handleCardTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ cardId: id, text: event.target.value }));
  };

  const handleInputTypeChange = (event: SelectChangeEvent<string>) => {
    dispatch(
      updateCardType({
        id,
        inputType: event.target.value as InputTypes,
      }),
    );
  };

  const { isFocused } = card;

  const textFieldStyles = {
    width: isTitle ? "100%" : 492,
    "& .MuiInputBase-root": {
      fontSize: isTitle ? 32 : 16,
      padding: (() => {
        if (!isFocused) return 0;
        return isTitle ? 0 : "16px";
      })(),
      backgroundColor: isFocused && !isTitle ? "#F5F5F5" : "transparent",
      "&:before": {
        borderBottom: isFocused ? "1px solid #B0B0B0" : "none",
      },
      "&:after": {
        borderBottom: "2px solid #6A1B9A",
      },
    },
    "& input": {
      padding: 0,
    },
  };

  const selectStyles = {
    width: 208,
    height: 48,
    "& fieldset": {
      borderColor: "#B0B0B0 !important",
      borderWidth: "1px !important",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Controller
        name="CardTitle"
        control={control}
        render={() => (
          <TextField
            {...register(id)}
            value={card.cardTitle}
            onChange={handleCardTitleChange}
            placeholder={isTitle ? "설문지 제목" : "질문"}
            variant="filled"
            fullWidth={isTitle}
            sx={textFieldStyles}
          />
        )}
      />

      {!isTitle && isFocused && (
        <Controller
          name="inputTypeSelect"
          control={control}
          render={() => (
            <Select
              onChange={handleInputTypeChange}
              defaultValue={InputTypes.RADIO}
              sx={selectStyles}
            >
              {Object.entries(InputTypes)
                .filter(([_, value]) => value !== InputTypes.TITLE)
                .map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {inputTypeLabels[value as Exclude<InputTypes, InputTypes.TITLE>]}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      )}
    </Box>
  );
};

export default React.memo(CardHeader);
