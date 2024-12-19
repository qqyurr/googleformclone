import { CardProps, InputTypes } from "../types";

export const validationReducers = {
  toggleCardRequired: (state: CardProps[], action: { payload: { id: string } }) => {
    const targetCard = state.find((card) => card.id === action.payload.id);
    if (targetCard) targetCard.isRequired = !targetCard.isRequired;
  },

  updateCardType: (
    state: CardProps[],
    action: { payload: { id: string; inputType: InputTypes } },
  ) => {
    const targetCard = state.find((card) => card.id === action.payload.id);
    if (!targetCard) return;

    targetCard.inputType = action.payload.inputType;
    targetCard.contents = [InputTypes.RADIO, InputTypes.CHECKBOX, InputTypes.SELECT].includes(
      action.payload.inputType,
    )
      ? [{ id: String(Date.now()), text: "옵션 1" }]
      : "";
  },
};
