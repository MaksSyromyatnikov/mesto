// объект с селекторами и классами
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

// включение валидации всех форм
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);

  });
};

// слушатели инпутов
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, disableButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);


  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement);

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
  console.log(inputElement);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  console.log(errorElement);
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

enableValidation(configValidation);















// const addUserForm = document.forms.profile;
// const addPlaceForm = document.forms.place;

// //объект с ошибками
// const ERRORS = {
//   wrongLength: `Введите значение от 2 до 40 символов`,
//   empty: 'Вы пропустили это поле'
// }

// //проверка валидности инпутов
// const checkInputValidity = (input) => {
//   input.setCustomValidity("");
//   const buttonSubmit = input.parentNode.querySelector('.popup__save-button');
//   setButtonState(buttonSubmit);

//   console.log(input.validity);

//   if (input.validity.valueMissing) {
//     input.setCustomValidity(ERRORS.empty);
//     input.classList.add('popup__input_type_error');
//     return false;
//   }

//   if (input.validity.tooLong || input.validity.tooShort){
//     input.setCustomValidity(input.validationMessage);
//     input.classList.add('popup__input_type_error');
//     return false;
//   }

//   if (input.validity.typeMismatch && input.type === 'url'){
//     input.setCustomValidity(input.validationMessage);
//     input.classList.add('popup__input_type_error');
//     return false;
//   }

//   input.classList.remove('popup__input_type_error');
//   return input.checkValidity();
// }

// // валидируем инпут
// const validateInput = (input) => {
//   const errorElement = input.parentNode.querySelector(`#${input.id}-error`);

//   checkInputValidity(input);

//   errorElement.textContent = input.validationMessage;

// }

// // Переключение состояния кнопки
// const enableButton = (button) => {
//   button.disabled = false;
//   console.log(button.disabled);
//   button.classList.add('popup__save-button-disabled');
// }

// const disableButton = (button) => {
//   button.disabled = true;
//   button.classList.remove('popup__save-button-disabled');
// }

// const setButtonState = (button, isValid) => {
//   if (isValid) {
//     enableButton(button);
//   } else {
//     disableButton(button);
//   }
// }

// const handleInput = (evt) => {
//   const currentForm = evt.currentTarget;
//   const input = evt.target;
//   const submitButton = currentForm.querySelector('.popup__save-button');
//   setButtonState(submitButton, currentForm.checkValidity());

//   validateInput(input);
// }

// addUserForm.addEventListener('input', handleInput);
// addPlaceForm.addEventListener('input', handleInput);
