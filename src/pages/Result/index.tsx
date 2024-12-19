import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { InputTypes, SelectOptionProps, StateProps } from "../../types";

interface AnswerProps {
  trueAnswer: string[];
  falseAnswer: string[];
}

interface ResultCardDataProps {
  id: string;
  title: string;
  inputType: InputTypes;
  answer: AnswerProps;
  contents: SelectOptionProps[];
  isRequired: boolean;
}

const Result = () => {
  const { state: stateData } = useLocation();
  const [resultData, setResultData] = useState<ResultCardDataProps[]>([]);
  const { cards } = useSelector((state: StateProps) => state);

  useEffect(() => {
    const mapAnswers = (
      contentsResult: any,
      contents: SelectOptionProps[],
      inputType: InputTypes,
    ) => {
      if (!contentsResult) return { trueAnswer: [], falseAnswer: [] };

      if (typeof contentsResult === "string") {
        if (inputType === InputTypes.SELECT) {
          const selectedContent = contents.find((content) => content.id === contentsResult);
          return {
            trueAnswer: selectedContent?.text ? [selectedContent.text] : [],
            falseAnswer: [],
          };
        }
        return { trueAnswer: [contentsResult], falseAnswer: [] };
      }

      if (typeof contentsResult === "object") {
        const answer: AnswerProps = { trueAnswer: [], falseAnswer: [] };
        Object.entries(contentsResult).forEach(([key, value]) => {
          const content = contents.find((c) => c.id === key);
          if (!content?.text) return;
          (value ? answer.trueAnswer : answer.falseAnswer).push(content.text);
        });
        return answer;
      }

      return { trueAnswer: [], falseAnswer: [] };
    };

    const resultCardsDataArr = cards
      .filter((card) => card.inputType !== InputTypes.TITLE)
      .map((originalCard) => {
        const contents = Array.isArray(originalCard.contents) ? originalCard.contents : [];
        const answer = mapAnswers(stateData[originalCard.id], contents, originalCard.inputType);

        return {
          id: originalCard.id,
          title: originalCard.cardTitle || "제목 없음",
          inputType: originalCard.inputType,
          answer,
          contents,
          isRequired: originalCard.isRequired,
        };
      });

    setResultData(resultCardsDataArr);
  }, [cards, stateData]);

  const renderAnswer = (card: ResultCardDataProps) => {
    if (!card.answer.trueAnswer.length) {
      return (
        <Typography variant="body2" color="error">
          응답하지 않았습니다.
        </Typography>
      );
    }

    switch (card.inputType) {
      case InputTypes.TEXT:
      case InputTypes.TEXTAREA:
        return (
          <TextField
            label={card.title}
            value={card.answer.trueAnswer[0] || ""}
            fullWidth
            variant="outlined"
            disabled
          />
        );

      case InputTypes.RADIO:
        return (
          <RadioGroup>
            {card.contents.map(
              (content) =>
                content.text && (
                  <FormControlLabel
                    key={content.id}
                    value={content.text}
                    control={
                      <Radio disabled checked={card.answer.trueAnswer.includes(content.text)} />
                    }
                    label={content.text}
                  />
                ),
            )}
          </RadioGroup>
        );

      case InputTypes.CHECKBOX:
        return (
          <Box>
            {card.contents.map(
              (content) =>
                content.text && (
                  <FormControlLabel
                    key={content.id}
                    control={
                      <Checkbox disabled checked={card.answer.trueAnswer.includes(content.text)} />
                    }
                    label={content.text}
                  />
                ),
            )}
          </Box>
        );

      case InputTypes.SELECT:
        return (
          <Select value={card.answer.trueAnswer[0] || ""} disabled fullWidth>
            {card.contents.map(
              (content) =>
                content.text && (
                  <MenuItem key={content.id} value={content.text}>
                    {content.text}
                  </MenuItem>
                ),
            )}
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2, mt: 2, width: 640, bgcolor: "#FAFAFA" }}>
      {resultData.map((card) => (
        <Paper
          key={card.id}
          sx={{ p: 2, mb: 2, border: "1px solid #d3d3d3", borderRadius: 2, bgcolor: "#FFFFFF" }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {card.title}
            </Typography>
          </Box>
          <Box>{renderAnswer(card)}</Box>
        </Paper>
      ))}
    </Paper>
  );
};

export default Result;
