import React from "react";
import { MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import { CardProps, SelectOptionProps, StateProps } from "../../../types";

const SelectInput = ({ id }: Pick<CardProps, "id">) => {
  const { control } = useFormContext();

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents;
  }) as SelectOptionProps[];

  return (
    <Controller
      control={control}
      name={id}
      render={({ field: { onChange } }) => (
        <Select defaultValue="" onChange={onChange} displayEmpty>
          <MenuItem value="">
            <em>선택</em>
          </MenuItem>
          {contents.map((content) => (
            <MenuItem key={content.id} value={content.id}>
              {content.text}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default SelectInput;
