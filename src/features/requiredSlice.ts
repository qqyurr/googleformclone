import { createSlice } from "@reduxjs/toolkit";

const requiredSlice = createSlice({
  name: "required",
  initialState: "",
  reducers: {
    assignRequiredCardId: (state, action) => action.payload.cardId,
    clearRequiredCardId: () => "",
  },
});

export const { assignRequiredCardId, clearRequiredCardId } = requiredSlice.actions;
export default requiredSlice.reducer;
