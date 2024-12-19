/* eslint-disable no-shadow, no-use-before-define */
export enum InputTypes {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  SELECT = "SELECT",
  TITLE = "TITLE",
}

export interface CardProps {
  id: string;
  cardTitle: string;
  inputType: InputTypes;
  contents: string | SelectOptionProps[];
  isFocused: boolean;
  isRequired: boolean;
}

export interface SelectOptionProps {
  id: string;
  text?: string;
  isEtc?: boolean;
}

export interface StateProps {
  cards: CardProps[];
  required: string;
}
