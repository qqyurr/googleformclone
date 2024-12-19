import React from "react";
import { useSelector } from "react-redux";

import { CardProps, InputTypes, SelectOptionProps, StateProps } from "../../types";
import { Box, Typography } from "@mui/material";

const PreviewCardTitle = ({ id }: Pick<CardProps, "id">) => {
  const { inputType, cardTitle, contents, isRequired, haveRequired } = useSelector(
    (state: StateProps) => {
      const currentCard = state.cards.find((card) => card.id === id) as CardProps;
      return {
        inputType: currentCard.inputType,
        cardTitle: currentCard.cardTitle,
        contents: currentCard.contents,
        isRequired: currentCard.isRequired,
        haveRequired: state.cards.some((card) => card.isRequired),
      };
    },
  );

  const isTitle = inputType === InputTypes.TITLE;

  const renderContents = () => {
    if (typeof contents === "string") {
      return contents;
    }
    if (Array.isArray(contents)) {
      return contents.map((content: SelectOptionProps) => (
        <Typography key={content.id} variant="body2">
          {content.text}
        </Typography>
      ));
    }
    return null;
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant={isTitle ? "h4" : "body1"} sx={{ py: 1 }}>
          {cardTitle}
        </Typography>
        {isRequired && (
          <Typography
            component="span"
            sx={{
              pl: 0.5,
              fontSize: 16,
              color: "error.main",
            }}
          >
            *
          </Typography>
        )}
      </Box>

      {isTitle && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            {renderContents()}
          </Box>

          {haveRequired && (
            <Box
              sx={{
                width: "100%",
                pt: 3,
                borderTop: "1px solid",
                borderColor: "grey.400",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: 16,
                  color: "error.main",
                }}
              >
                * 필수항목
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PreviewCardTitle;
