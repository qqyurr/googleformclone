# Google Form Clone

### how to start

```
npm install
npm start
```

### 1. **양식 지우기**

- 페이지 새로고침을 통해 양식을 초기화합니다.

```jsx
onClick={() => window.location.reload()}
```

### 2. **질문 데이터 저장**

- **상태 관리:** `Redux`를 사용하여 상태 관리.
- **데이터 지속성:** `redux-persist`를 사용하여 Redux 상태를 로컬 스토리지에 저장.

### 3. **사용자 친화적인 UI/UX**

- `Material-UI (MUI)` 컴포넌트를 사용하여 Result Page 개발
- 유저에게 친숙한 UI를 사용하여 사용성 증진
  ```tsx
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
  ```

### 4. **렌더링 성능 최적화**

- **useCallback 활용:** 이벤트 핸들러 `syncButtonPosition`, `handleAddCard`를 `useCallback`으로 메모이제이션하여 불필요한 재생성을 방지
- **useLayoutEffect 사용:** 초기 DOM 조작은 `useLayoutEffect`를 사용해 빠르게 반영되도록 설정했습니다.
- **ResizeObserver 사용:** 카드 크기 변화를 감지하기 위해 `ResizeObserver`를 사용해 동적으로 버튼 위치를 조정했습니다.

```jsx
const AddCardButton = () => {
  const dispatch = useDispatch();
  const focusedCardIndex = useSelector((state: StateProps) =>
    state.cards.findIndex((card) => card.isFocused),
  );

  const buttonRef = useRef<HTMLDivElement>(null);

  const syncButtonPosition = useCallback(() => {
    const focusedCard = document.querySelector(
      `[data-index='${focusedCardIndex}']`,
    ) as HTMLElement | null;

    if (focusedCard && buttonRef.current) {
      const { top } = focusedCard.getBoundingClientRect();
      const calculatedTop = window.scrollY + top - 90;

      buttonRef.current.style.top = calculatedTop < 70 ? "70px" : `${calculatedTop}px`;
    }
  }, [focusedCardIndex]);

  const handleAddCard = useCallback(() => {
    const newCardIndex = focusedCardIndex !== -1 ? focusedCardIndex : 0;
    dispatch(
      insertCard({
        cardTitle: "제목없는 질문",
        focusedCardIndex: newCardIndex,
        cardId: String(Date.now()),
      }),
    );
  }, [dispatch, focusedCardIndex]);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(syncButtonPosition);

    const focusedCard = document.querySelector(
      `[data-index='${focusedCardIndex}']`,
    ) as HTMLElement | null;

    if (focusedCard) {
      resizeObserver.observe(focusedCard);
    }

    window.addEventListener("scroll", syncButtonPosition);
    syncButtonPosition();

    return () => {
      window.removeEventListener("scroll", syncButtonPosition);
      resizeObserver.disconnect();
    };
  }, [focusedCardIndex, syncButtonPosition]);

  return (
    <Box
      ref={buttonRef}
      sx={{
        position: "relative",
        zIndex: 10,
      }}
    >
      <Tooltip title="질문 추가" placement="right">
        <Fab color="primary" aria-label="add" sx={FAB_STYLES} onClick={handleAddCard}>
          <AddCircleOutlineIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default React.memo(AddCardButton);

```
