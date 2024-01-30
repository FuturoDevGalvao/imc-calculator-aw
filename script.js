let calculationAttempt = false;

const getCards = () => {
  return {
    cardBelowWeight: document.querySelector(".below-weight"),
    cardNormal: document.querySelector(".normal"),
    cardOverWeight: document.querySelector(".over-weight"),
    cardObesity: document.querySelector(".obesity"),
  };
};

const getInputs = () => {
  return {
    inputWeight: {
      element: document.getElementById("input-weight"),
      empty: true,
      errMessage: getErrMessages().errMessageWeight,
    },
    inputHeight: {
      element: document.getElementById("input-height"),
      empty: true,
      errMessage: getErrMessages().errMessageHeight,
    },
  };
};

/* 
  console.log(
    "peso vazio: " + inputWeight.empty,
    "altura vazia: " + inputHeight.empty
  );
*/

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

const getErrMessages = () => {
  return {
    errMessageWeight: document.querySelector(".error-message-weight"),
    errMessageHeight: document.querySelector(".error-message-height"),
  };
};

const calculateImc = () => {
  calculationAttempt = true;
  const isValidated = validateInputs();

  if (isValidated) {
    const weight = getInputs().inputWeight.element.value;
    const height = getInputs().inputHeight.element.value;

    const imc = (weight / height ** 2).toFixed(1);

    console.log("Your imc is: " + imc);
    showResultCard();
  }
};

const setContentInputSituation = (inputWeight, inputHeight) => {
  inputWeight.empty = isEmpty(inputWeight.element);
  inputHeight.empty = isEmpty(inputHeight.element);
};

const addListenerForInputs = () => {
  const { inputWeight, inputHeight } = getInputs();

  const inputs = [inputWeight, inputHeight];

  inputs.forEach((input) => {
    input.element.addEventListener("input", () => {
      setContentInputSituation(inputWeight, inputHeight);
      removeErrorStyle(input);
      if (calculationAttempt) setVisibilityMessageErr(inputWeight, inputHeight);
    });
  });
};

const getResultCard = () => {
  return {
    element: document.getElementById("card-result"),
    btnClose: document.getElementById("btn-close-card"),
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

document.getElementById("btn-calc").addEventListener("click", calculateImc);
getResultCard().element.addEventListener("click", hideResultCard);

window.onload = () => {
  addListenerForInputs();
};
