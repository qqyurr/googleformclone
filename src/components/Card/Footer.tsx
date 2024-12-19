import React from "react";
import { Tooltip, IconButton, Switch, FormControlLabel, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ContentCopy, Delete } from "@mui/icons-material";

import { copyCard, deleteCard, toggleCardRequired } from "../../features/cardSlice";
import { CardProps, StateProps } from "../../types";

interface CardFooterProps {
  id: string;
}

const IconActionButton = ({
  title,
  Icon,
  onClick,
}: {
  title: string;
  Icon: React.ElementType;
  onClick: (e: React.MouseEvent) => void;
}) => (
  <Tooltip title={title}>
    <IconButton onClick={onClick} sx={{ p: 1 }}>
      <Icon sx={{ width: 25, height: 25, cursor: "pointer" }} />
    </IconButton>
  </Tooltip>
);

const CardFooter = ({ id }: CardFooterProps) => {
  const dispatch = useDispatch();

  const isRequired = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isRequired;
  });

  const handleToggleRequired = () => dispatch(toggleCardRequired({ id }));

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(copyCard({ cardId: id, copiedCardId: String(Date.now()) }));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteCard({ cardId: id }));
  };

  return (
    <Box
      sx={{
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderTop: "1px solid #B0B0B0",
        px: 2,
      }}
    >
      <IconActionButton title="복사" Icon={ContentCopy} onClick={handleCopy} />
      <IconActionButton title="삭제" Icon={Delete} onClick={handleRemove} />

      <Box
        sx={{
          mx: 2,
          width: 0,
          height: 32,
          borderLeft: "1px solid #B0B0B0",
        }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={isRequired}
            onChange={handleToggleRequired}
            sx={{
              "& .Mui-checked": { color: "#6A1B9A !important" },
              "& .MuiSwitch-track": { backgroundColor: "#6A1B9A !important" },
            }}
          />
        }
        label="필수"
        labelPlacement="start"
        sx={{
          m: 0,
          ml: 1,
          "& .MuiFormControlLabel-label": { fontSize: 14 },
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </Box>
  );
};

export default React.memo(CardFooter);
