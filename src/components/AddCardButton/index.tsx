import React, { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Tooltip, Fab, Box } from "@mui/material";

import { insertCard } from "../../features/cardSlice";
import { StateProps } from "../../types";

const FAB_STYLES = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid #B0B0B0",
  borderRadius: 1,
  ml: 2,
  width: "50px",
  height: "50px",
  boxShadow:
    "0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12)",
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
};

const AddCardButton = () => {
  const dispatch = useDispatch();
  const focusedCardIndex = useSelector((state: StateProps) =>
    state.cards.findIndex((card) => card.isFocused),
  );

  const buttonRef = useRef<HTMLDivElement>(null);

  const syncButtonPosition = useCallback(() => {
    const focusedCard = document.querySelector(
      `[data-index='${focusedCardIndex}']`,
    ) as HTMLElement | null;

    if (focusedCard && buttonRef.current) {
      const { top } = focusedCard.getBoundingClientRect();
      const calculatedTop = window.scrollY + top - 90;

      buttonRef.current.style.top = calculatedTop < 70 ? "70px" : `${calculatedTop}px`;
    }
  }, [focusedCardIndex]);

  const handleAddCard = useCallback(() => {
    const newCardIndex = focusedCardIndex !== -1 ? focusedCardIndex : 0;
    dispatch(
      insertCard({
        cardTitle: "제목없는 질문",
        focusedCardIndex: newCardIndex,
        cardId: String(Date.now()),
      }),
    );
  }, [dispatch, focusedCardIndex]);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(syncButtonPosition);

    const focusedCard = document.querySelector(
      `[data-index='${focusedCardIndex}']`,
    ) as HTMLElement | null;

    if (focusedCard) {
      resizeObserver.observe(focusedCard);
    }

    window.addEventListener("scroll", syncButtonPosition);
    syncButtonPosition();

    return () => {
      window.removeEventListener("scroll", syncButtonPosition);
      resizeObserver.disconnect();
    };
  }, [focusedCardIndex, syncButtonPosition]);

  return (
    <Box
      ref={buttonRef}
      sx={{
        position: "relative",
        zIndex: 10,
      }}
    >
      <Tooltip title="질문 추가" placement="right">
        <Fab color="primary" aria-label="add" sx={FAB_STYLES} onClick={handleAddCard}>
          <AddCircleOutlineIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default React.memo(AddCardButton);
