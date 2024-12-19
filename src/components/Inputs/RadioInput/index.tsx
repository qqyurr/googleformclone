import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import { Radio, RadioGroup, FormControlLabel, TextField, Box, Typography } from "@mui/material";

import { CardProps, SelectOptionProps, StateProps } from "../../../types";

const RadioInput = ({ id }: Pick<CardProps, "id">) => {
  const etcRef = useRef<HTMLInputElement>(null);
  const etcRefRadio = useRef<HTMLInputElement>(null);
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
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 0.5,
          }}
        >
          {contents.map((content) => (
            <Box key={content.id} sx={{ display: "flex", alignItems: "center" }}>
              <Radio
                inputRef={content.isEtc ? etcRefRadio : null}
                name={id}
                id={content.id}
                value={content.isEtc ? etcRef.current?.value : content.text}
                onChange={(e) => {
                  onChange(content.isEtc ? etcRef.current?.value : e.target.value);
                }}
                sx={{
                  cursor: "pointer",
                  "&.Mui-checked": {
                    color: "#6A1B9A",
                  },
                }}
              />

              <FormControlLabel
                control={<></>}
                label={
                  content.isEtc ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography component="span" sx={{ mr: 1 }}>
                        기타:
                      </Typography>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        inputRef={etcRef}
                        onChange={() => {
                          if (etcRefRadio.current?.checked) {
                            onChange(etcRef.current?.value);
                          }
                        }}
                        sx={{
                          width: 200,
                          "& .MuiInputBase-root": { fontSize: 14 },
                          "&:before": {
                            borderBottom: "1px solid #B0B0B0 !important",
                          },
                          "&:after": {
                            borderBottom: "2px solid #6A1B9A",
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography component="label" htmlFor={content.id} sx={{ pl: 1.5 }}>
                      {content.text}
                    </Typography>
                  )
                }
              />
            </Box>
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default RadioInput;
