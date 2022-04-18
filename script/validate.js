// объект с селекторами и классами
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

// включение валидации всех форм, используем селектор с rest оператором
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);

  });
};

// слушатели инпутов + изначальный state кнопок
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, disableButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, disableButtonClass);

    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, {...rest});
      toggleButtonState(inputList, buttonElement, disableButtonClass);
    });
  });
};

// проверка валидности инпутов
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass, ...rest}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some ((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// изменение состояния кнопки
const toggleButtonState = (inputList, buttonElement, disableButtonClass) => {

  if (hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}

// показ и скрытие ошибки
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const  errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //console.log(inputElement);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  //console.log(errorElement);
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

enableValidation(configValidation);
