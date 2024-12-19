import { createSlice } from "@reduxjs/toolkit";
import { initialCards } from "./initialState";
import { cardReducers } from "./cardReducers";
import { contentReducers } from "./contentReducers";
import { validationReducers } from "./validationReducers";

const cardSlice = createSlice({
  name: "cards",
  initialState: [initialCards],
  reducers: {
    ...cardReducers,
    ...contentReducers,
    ...validationReducers,
  },
});

export const {
  setTitle,
  insertCard,
  deleteCard,
  setCardFocus,
  updateCardType,
  copyCard,
  toggleCardRequired,
  addEtcItem,
  addSelectItem,
  removeSelectItem,
  setText,
  moveCard,
  moveContent,
} = cardSlice.actions;
export default cardSlice.reducer;
