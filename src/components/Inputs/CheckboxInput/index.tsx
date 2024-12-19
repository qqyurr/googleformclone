import React from "react";
import { useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, Box, Typography } from "@mui/material";

import { CardProps, SelectOptionProps, StateProps } from "../../../types";

const CheckboxInput = ({ id }: Pick<CardProps, "id">) => {
  const { control } = useFormContext();

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents as SelectOptionProps[];
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {contents.map((content) => (
        <Controller
          key={content.id}
          name={`${id}.${content.id}`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  id={content.id}
                  checked={!!value}
                  onChange={(e) => onChange(e.target.checked)}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      width: 20,
                      height: 20,
                      color: "#6A1B9A",
                    },
                  }}
                />
              }
              label={
                <Typography
                  component="span"
                  sx={{
                    cursor: "pointer",
                    pl: 1.5,
                  }}
                >
                  {content.text}
                </Typography>
              }
            />
          )}
        />
      ))}
    </Box>
  );
};

export default CheckboxInput;
