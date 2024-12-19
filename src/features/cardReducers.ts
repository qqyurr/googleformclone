import { CardProps } from "../types";
import { generateNewCard } from "./generateNewCard";
import { PayloadAction } from "@reduxjs/toolkit";

export const cardReducers = {
  setTitle: (state: CardProps[], action: { payload: { cardId: string; text: string } }) => {
    const targetCard = state.find((card) => card.id === action.payload.cardId);
    if (targetCard) {
      targetCard.cardTitle = action.payload.text;
    }
  },

  moveCard: (
    state: CardProps[],
    action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>,
  ) => {
    const copiedState = [...state];
    const movingCard = copiedState.splice(action.payload.sourceIndex, 1);
    copiedState.splice(action.payload.destinationIndex, 0, ...movingCard);
    return copiedState;
  },

  insertCard: (
    state: CardProps[],
    action: { payload: { cardId: string; cardTitle: string; focusedCardIndex: number } },
  ) => {
    const copiedState = state.map((card) => ({ ...card, isFocused: false }));
    const insertIndex = action.payload.focusedCardIndex + 1;
    const newCard = generateNewCard(action.payload.cardId, action.payload.cardTitle);

    insertIndex > 0 ? copiedState.splice(insertIndex, 0, newCard) : copiedState.push(newCard);
    return copiedState;
  },

  deleteCard: (state: CardProps[], action: { payload: { cardId: string } }) => {
    const copiedState = state.map((card) => ({ ...card, isFocused: false }));
    const targetIndex = copiedState.findIndex((card) => card.id === action.payload.cardId);

    const filteredState = copiedState.filter((card) => card.id !== action.payload.cardId);

    if (targetIndex !== -1 && targetIndex > 0) {
      filteredState[targetIndex - 1].isFocused = true;
    } else if (filteredState.length > 0) {
      filteredState[0].isFocused = true;
    }
    return filteredState;
  },

  setCardFocus: (state: CardProps[], action: { payload: { id: string } }) => {
    return state.map((card) => ({
      ...card,
      isFocused: card.id === action.payload.id,
    }));
  },

  copyCard: (state: CardProps[], action: { payload: { cardId: string; copiedCardId: string } }) => {
    const copiedState = state.map((card) => ({ ...card, isFocused: false }));
    const targetCard = copiedState.find((card) => card.id === action.payload.cardId);

    if (!targetCard) return state;

    const newCard = {
      ...targetCard,
      id: action.payload.copiedCardId,
      isFocused: true,
    };

    if (Array.isArray(targetCard.contents)) {
      newCard.contents = targetCard.contents.map((content, idx) => ({
        ...content,
        id: String(Number(action.payload.copiedCardId) + idx),
      }));
    }

    const targetIndex = copiedState.findIndex((card) => card.id === action.payload.cardId);
    copiedState.splice(targetIndex + 1, 0, newCard);

    return copiedState;
  },
};
