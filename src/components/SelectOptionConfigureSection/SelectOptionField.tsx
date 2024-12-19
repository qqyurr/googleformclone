import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Controller } from "react-hook-form";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon, DragIndicator } from "@mui/icons-material";

import { SelectOptionProps, InputTypes } from "../../types";

interface SelectOptionFieldProps {
  content: SelectOptionProps;
  index: number;
  id: string;
  inputType: string;
  isFocused: boolean;
  control: any;
  handleTextChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string,
  ) => void;
  handleRemoveOption: (contentId: string) => void;
}

const SelectOptionField = ({
  content,
  index,
  id,
  inputType,
  isFocused,
  control,
  handleTextChange,
  handleRemoveOption,
}: SelectOptionFieldProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Draggable draggableId={content.id} index={index} key={content.id}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            p: 1,
            position: "relative",
          }}
        >
          <Box
            {...provided.dragHandleProps}
            sx={{
              position: "absolute",
              left: -15,
              top: "50%",
              transform: "translateY(-45%)",
              visibility: isHovered ? "visible" : "hidden",
            }}
          >
            <DragIndicator sx={{ fontSize: 24, color: "#B0B0B0" }} />
          </Box>

          <Box sx={{ mr: 2 }}>
            {inputType === InputTypes.RADIO && (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: "2px solid #B0B0B0",
                }}
              />
            )}
            {inputType === InputTypes.CHECKBOX && (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: 1,
                  border: "2px solid #B0B0B0",
                }}
              />
            )}
            {inputType === InputTypes.SELECT && <Typography>{index + 1}</Typography>}
          </Box>

          <Controller
            name="TextFieldInput"
            control={control}
            render={() => (
              <TextField
                variant="standard"
                value={content.isEtc ? "기타..." : content.text}
                onChange={(e) => handleTextChange(e, content.id)}
                disabled={content.isEtc}
                sx={{
                  width: 600,
                  "& .MuiInputBase-root": { fontSize: 14 },
                  "& .Mui-disabled": {
                    borderBottom: "1px dotted #B0B0B0 !important",
                  },
                }}
              />
            )}
          />

          {isFocused && (
            <IconButton onClick={() => handleRemoveOption(content.id)}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Draggable>
  );
};

export default React.memo(SelectOptionField);
