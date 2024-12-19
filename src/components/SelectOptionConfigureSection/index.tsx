import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { addEtcItem, addSelectItem, removeSelectItem, setText } from "../../features/cardSlice";
import { CardProps, InputTypes, StateProps } from "../../types";

import SelectOptionField from "./SelectOptionField";
import SelectOptionActions from "./SelectOptionActions";

const SelectOptionConfigureSection = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();
  const { control } = useForm();

  const currentCard = useSelector((state: StateProps) =>
    state.cards.find((card) => card.id === id),
  ) as CardProps;
  console.log(currentCard, "currentCard");
  const { inputType, contents, isFocused } = currentCard;

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string,
  ) => {
    dispatch(setText({ cardId: id, contentId, text: e.target.value }));
  };

  const handleAddOption = () => {
    const contentId = String(Date.now());

    if (Array.isArray(contents)) {
      const newOptionText = `옵션 ${contents.filter((c) => !c.isEtc).length + 1}`;

      dispatch(
        addSelectItem({
          id,
          contentId,
          text: newOptionText,
        }),
      );
    } else {
      console.error("contents가 배열이 아닙니다.", contents);
    }
  };

  const handleAddEtc = () => {
    const contentId = String(Date.now());
    dispatch(addEtcItem({ id, contentId }));
  };

  const handleRemoveOption = (contentId: string) => {
    dispatch(removeSelectItem({ cardId: id, contentId }));
  };

  return (
    <Box>
      <Droppable droppableId={id} type="content">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {Array.isArray(contents) &&
              contents.map((content, idx) => (
                <SelectOptionField
                  key={content.id}
                  content={content}
                  index={idx}
                  id={id}
                  inputType={inputType}
                  isFocused={isFocused}
                  control={control}
                  handleTextChange={handleTextChange}
                  handleRemoveOption={handleRemoveOption}
                />
              ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {isFocused && inputType !== InputTypes.TITLE && (
        <SelectOptionActions
          inputType={inputType}
          contents={contents}
          handleAddOption={handleAddOption}
          handleAddEtc={handleAddEtc}
        />
      )}
    </Box>
  );
};

export default React.memo(SelectOptionConfigureSection);
