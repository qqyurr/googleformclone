import { CardProps, InputTypes } from "../types";

export const generateNewCard = (cardId: string, cardTitle = ""): CardProps => ({
  id: cardId,
  cardTitle,
  inputType: InputTypes.RADIO,
  contents: [{ id: String(Number(cardId) + 1), text: "옵션 1" }],
  isFocused: true,
  isRequired: false,
});
