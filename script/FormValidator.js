'use strict'
export class FormValidator {
  constructor (obj, formElementType){
    this._obj = obj;
    this._formElementType = formElementType;
    this._inputList = Array.from(this._formElementType.querySelectorAll(this._obj.inputSelector));
    this._buttonSubmitForm = this._formElementType.querySelector(this._obj.submitButtonSelector);
  }
    // показ и скрытие ошибки
  _showInputError = (inputElement, errorMessage) => {
    const  errorElement = document.getElementById(`${inputElement.id}-error`);

    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = errorMessage;

    errorElement.classList.add(this._obj.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.textContent = '';
  };

  // проверка валидности инпутов
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some ((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  resetAllInputs = () => {
    //все инпуты
    const allInputs = Array.from(this._formElementType.querySelectorAll('.popup__input'));

    //Очищаем от ошибок
    allInputs.forEach((inputElement) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
  });
  }

  disableSubmitButton = () => {
    this._buttonSubmitForm.classList.add(this._obj.disableButtonClass);
    this._buttonSubmitForm.setAttribute('disabled', true);
  }

  enableSubmitButton = () => {
    this._buttonSubmitForm.classList.remove(this._obj.disableButtonClass);
    this._buttonSubmitForm.removeAttribute('disabled', 'disabled');
  }

    // изменение состояния кнопки
  toggleButtonState = () => {
    if (this._hasInvalidInput()){
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

    // слушатели инпутов + изначальный state кнопок
  _setEventListeners = () => {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };


  enableValidation = () => {
    this._setEventListeners();
  };

}
