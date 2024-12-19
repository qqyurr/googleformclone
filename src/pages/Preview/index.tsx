import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

import PreviewCard from "../../components/PreviewCard";

import { clearRequiredCardId, assignRequiredCardId } from "../../features/requiredSlice";
import { InputTypes, StateProps, CardProps } from "../../types";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const methods = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isRequiredFieldComplete = (card: CardProps, value: any): boolean => {
    if (typeof card.contents === "object" && card.inputType !== InputTypes.RADIO) {
      return Object.values(value).some((val) => !!val);
    }
    return !!value;
  };

  const validateRequiredFields = () => {
    const formValues = methods.getValues();
    const cardIds = Object.keys(formValues);

    cardIds.forEach((cardId) => {
      const card = cards.find((c) => c.id === cardId && c.isRequired);
      if (!card) return;

      const isComplete = isRequiredFieldComplete(card, formValues[cardId]);

      if (isComplete) {
        dispatch(clearRequiredCardId());
      } else {
        dispatch(assignRequiredCardId({ cardId: card.id }));
        throw new Error("필수값 입력 필요");
      }
    });
  };

  const handleSubmit = () => {
    try {
      validateRequiredFields();
      navigate("/preview/result", { state: methods.getValues() });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("Unknown error:", e);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {cards.map((card) => (
          <PreviewCard key={card.id} id={card.id} />
        ))}
        <Box
          sx={{
            display: "flex",
            width: 640,
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 72,
              height: 36,
              backgroundColor: "purple",
              color: "white",
              borderRadius: 1,
              ":hover": {
                backgroundColor: "darkPurple",
              },
            }}
          >
            제출
          </Button>
          <Button
            type="button"
            onClick={() => window.location.reload()}
            sx={{
              backgroundColor: "transparent",
              color: "purple",
              borderRadius: 1,
              p: 1,
              ":hover": {
                backgroundColor: "lightBlue",
              },
            }}
          >
            양식 지우기
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Preview;
