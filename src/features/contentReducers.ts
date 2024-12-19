import { PayloadAction } from "@reduxjs/toolkit";
import { CardProps, SelectOptionProps, InputTypes } from "../types";

export const contentReducers = {
  moveContent: (
    state: CardProps[],
    action: PayloadAction<{ cardId: string; sourceIndex: number; destinationIndex: number }>,
  ) => {
    const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
    const contents = targetCard.contents as SelectOptionProps[];
    const tmp = contents.splice(action.payload.sourceIndex, 1);
    contents.splice(action.payload.destinationIndex, 0, ...tmp);
  },

  addEtcItem: (state: CardProps[], action: { payload: { id: string; contentId: string } }) => {
    const targetCard = state.find((card) => card.id === action.payload.id);
    if (targetCard && Array.isArray(targetCard.contents)) {
      targetCard.contents.push({ id: action.payload.contentId, isEtc: true });
    }
  },

  addSelectItem: (
    state: CardProps[],
    action: { payload: { id: string; contentId: string; text: string } },
  ) => {
    const targetCard = state.find((card) => card.id === action.payload.id);
    if (targetCard && Array.isArray(targetCard.contents)) {
      targetCard.contents.push({
        id: action.payload.contentId,
        text: action.payload.text,
      });
    }
  },

  removeSelectItem: (
    state: CardProps[],
    action: { payload: { cardId: string; contentId: string } },
  ) => {
    const targetCard = state.find((card) => card.id === action.payload.cardId);
    if (targetCard && Array.isArray(targetCard.contents)) {
      targetCard.contents = targetCard.contents.filter(
        (item) => item.id !== action.payload.contentId,
      );
    }
  },

  setText: (
    state: CardProps[],
    action: { payload: { cardId: string; contentId?: string; text: string } },
  ) => {
    const targetCard = state.find((card) => card.id === action.payload.cardId);
    if (!targetCard) return;

    if (targetCard.inputType === InputTypes.TEXT || targetCard.inputType === InputTypes.TEXTAREA) {
      targetCard.contents = action.payload.text;
    } else if (
      [InputTypes.RADIO, InputTypes.CHECKBOX, InputTypes.SELECT].includes(targetCard.inputType)
    ) {
      const targetContent = (targetCard.contents as SelectOptionProps[]).find(
        (content) => content.id === action.payload.contentId,
      );
      if (targetContent) targetContent.text = action.payload.text;
    }
  },
};
