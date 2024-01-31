let calculationAttempt = false;

const getCards = () => {
  return {
    cardBelowWeight: {
      element: document.querySelector(".below-weight"),
      bg: "var(--below-weight)",
    },
    cardNormal: {
      element: document.querySelector(".normal"),
      bg: "var(--normal)",
    },
    cardOverWeight: {
      element: document.querySelector(".over-weight"),
      bg: "var(--over-weight)",
    },
    cardObesity: {
      element: document.querySelector(".obesity"),
      bg: "var(--obesity)",
    },
  };
};

const setDataResultCard = (imc) => {
  getResultCard().imcText.textContent = imc;
  getResultCard().orientationText.textContent = getOrientation();
};

const getOrientation = () => {
  return window.innerWidth <= 800 ? "abaixo" : "ao lado";
};

const resetStyleCard = () => {
  Object.values(getCards()).forEach((card) => {
    card.element.style.backgroundColor = "transparent";
  });
};

const setCardCalssification = (imc) => {
  const assoativeClassification = {
    belowWeight: getCards().cardBelowWeight,
    normal: getCards().cardNormal,
    overWeight: getCards().cardOverWeight,
    obesity: getCards().cardObesity,
  };

  const cardToSet = assoativeClassification[getClassification(imc)];

  cardToSet.element.style.background = cardToSet.bg;
};

const getClassification = (imc) => {
  if (imc < 18.5) {
    return "belowWeight";
  } else if (imc <= 24.9) {
    return "normal";
  } else if (imc <= 30) {
    return "overWeight";
  } else {
    return "obesity";
  }
};

const getInputs = () => {
  return {
    inputWeight: {
      element: document.getElementById("input-weight"),
      empty: true,
      errMessage: document.querySelector(".error-message-weight"),
    },
    inputHeight: {
      element: document.getElementById("input-height"),
      empty: true,
      errMessage: document.querySelector(".error-message-height"),
    },
  };
};

const validateInputs = () => {
  let isValidated = true;
  const { inputWeight, inputHeight } = getInputs();

  setContentInputSituation(inputWeight, inputHeight);

  if (inputWeight.empty || inputHeight.empty) {
    isValidated = false;
    addErrorStyle(inputWeight, inputHeight);
    setVisibilityMessageErr(inputWeight, inputHeight);
  }

  setVisibilityMessageErr(inputWeight, inputHeight);

  return isValidated;
};

const isEmpty = (input) => {
  return input.value.trim() === "";
};

const addErrorStyle = (inputWeight, inputHeight) => {
  if (inputWeight.empty) {
    inputWeight.element.classList.add("error");
  }

  if (inputHeight.empty) {
    inputHeight.element.classList.add("error");
  }
};

const removeErrorStyle = (input) => {
  if (!input.empty) {
    input.element.classList.remove("error");
  }
};

const setVisibilityMessageErr = (inputWeight, inputHeight) => {
  const inputs = [inputWeight, inputHeight];

  inputs.forEach((input) => {
    if (input.empty) {
      input.errMessage.style.fontSize = "0.9rem";
      input.errMessage.style.opacity = "1";
    } else {
      input.errMessage.style.fontSize = "0.1rem";
      input.errMessage.style.opacity = "0";
    }
  });
};

const calculateImc = () => {
  calculationAttempt = true;
  const isValidated = validateInputs();

  if (isValidated) {
    const weight = getInputs().inputWeight.element.value.replace(",", ".");
    const height = getInputs().inputHeight.element.value.replace(",", ".");

    const imc = (weight / height ** 2).toFixed(2);

    resetStyleCard();
    setCardCalssification(imc);
    setDataResultCard(imc);
    showResultCard();
  }
};

const setContentInputSituation = (inputWeight, inputHeight) => {
  inputWeight.empty = isEmpty(inputWeight.element);
  inputHeight.empty = isEmpty(inputHeight.element);
};

const getResultCard = () => {
  return {
    element: document.getElementById("card-result"),
    btnClose: document.getElementById("btn-close-card"),
    imcText: document.getElementById("im-result"),
    orientationText: document.getElementById("orientation"),
  };
};

const showResultCard = () => {
  const resultCard = getResultCard().element;
  resultCard.style.opacity = "1";
  resultCard.style.left = "0";
};

const hideResultCard = () => {
  const resultCard = getResultCard().element;
  resultCard.style.opacity = "0";
  resultCard.style.left = "-30rem";
};

const addListenerInButtons = () => {
  document.getElementById("btn-calc").addEventListener("click", calculateImc);
  getResultCard().btnClose.addEventListener("click", hideResultCard);
};

const addListenerInInputs = () => {
  const { inputWeight, inputHeight } = getInputs();

  const inputs = [inputWeight, inputHeight];

  inputs.forEach((input) => {
    input.element.addEventListener("input", () => {
      resetStyleCard();
      hideResultCard();
      setContentInputSituation(inputWeight, inputHeight);
      removeErrorStyle(input);
      if (calculationAttempt) setVisibilityMessageErr(inputWeight, inputHeight);
    });
  });
};

window.onload = () => {
  addListenerInButtons();
  addListenerInInputs();
};
