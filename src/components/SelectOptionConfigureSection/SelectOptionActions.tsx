import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { SelectOptionProps, InputTypes } from "../../types";

interface SelectOptionActionsProps {
  inputType: string;
  contents: string | SelectOptionProps[];
  handleAddOption: () => void;
  handleAddEtc: () => void;
}

const SelectOptionActions = ({
  inputType,
  contents,
  handleAddOption,
  handleAddEtc,
}: SelectOptionActionsProps) => {
  const hasEtcItem = Array.isArray(contents) && contents.some((content) => content.isEtc);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
      <Box sx={{ mr: 2, ml: 1 }}>
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
      </Box>
      <Button variant="outlined" onClick={handleAddOption} sx={{ mr: 2 }}>
        옵션 추가
      </Button>

      {inputType !== "SELECT" && !hasEtcItem && (
        <>
          <Typography component="span" sx={{ mr: 2 }}>
            또는
          </Typography>
          <Button variant="outlined" onClick={handleAddEtc}>
            기타 추가
          </Button>
        </>
      )}
    </Box>
  );
};

export default React.memo(SelectOptionActions);
