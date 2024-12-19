import { CardProps, InputTypes } from "../types";

export const initialCards: CardProps = {
  id: "TitleCard",
  cardTitle: "제목 없는 설문지",
  inputType: InputTypes.TITLE,
  contents: "",
  isFocused: false,
  isRequired: false,
};
