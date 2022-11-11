"use strict"
import Popup from "./Popup.js";

import {
  popupImage,
  popupImageFull,
  popupImageSubtitle
} from "./constants.js";


export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm){
    super(popupSelector);
    this._submitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  // получаем данные инпутов из формы
  _getInputValues(){
    this.inputValues = {};
      this._inputs.forEach((el) => {
        console.log(this._inputs);
        this._inputValues[el.name] = el.value;
        console.log(this.inputValues);
      });
      return this._inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach((el) => {
      el.value = data[el.name];
    });
  }

  resetForm(){
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

}






// export class FormValidator {
//   constructor (obj, formElementType){
//     this._obj = obj;
//     this._formElementType = formElementType;
//     this._inputList = Array.from(this._formElementType.querySelectorAll(this._obj.inputSelector));
//     this._buttonSubmitForm = this._formElementType.querySelector(this._obj.submitButtonSelector);
//   }
//     // показ и скрытие ошибки
//   _showInputError = (inputElement, errorMessage) => {
//     const  errorElement = document.getElementById(`${inputElement.id}-error`);

//     inputElement.classList.add(this._obj.inputErrorClass);
//     errorElement.textContent = errorMessage;

//     errorElement.classList.add(this._obj.errorClass);
//   };

//   _hideInputError = (inputElement) => {
//     const errorElement = document.getElementById(`${inputElement.id}-error`);
//     inputElement.classList.remove(this._obj.inputErrorClass);
//     errorElement.textContent = '';
//   };

//   // проверка валидности инпутов
//   _checkInputValidity = (inputElement) => {
//     if (!inputElement.validity.valid) {
//       this._showInputError(inputElement, inputElement.validationMessage);
//     } else {
//       this._hideInputError(inputElement);
//     }
//   };

//   _hasInvalidInput = () => {
//     return this._inputList.some ((inputElement) => {
//       return !inputElement.validity.valid;
//     })
//   }

//   _resetAllInputs = () => {
//     //все инпуты
//     const allInputs = Array.from(this._formElementType.querySelectorAll('.popup__input'));

//     //Очищаем от ошибок
//     allInputs.forEach((inputElement) => {
//     const errorElement = document.getElementById(`${inputElement.id}-error`);
//     inputElement.classList.remove('popup__input_type_error');
//     errorElement.textContent = '';
//   });
//   }

//   disableSubmitButton = () => {
//     this._buttonSubmitForm.classList.add(this._obj.disableButtonClass);
//     this._buttonSubmitForm.setAttribute('disabled', true);
//   }

//   enableSubmitButton = () => {
//     this._buttonSubmitForm.classList.remove(this._obj.disableButtonClass);
//     this._buttonSubmitForm.removeAttribute('disabled', 'disabled');
//   }

//     // изменение состояния кнопки
//   toggleButtonState = () => {
//     if (this._hasInvalidInput()){
//       this.disableSubmitButton();
//     } else {
//       this.enableSubmitButton();
//     }
//   }

//     // слушатели инпутов + изначальный state кнопок
//   _setEventListeners = () => {
//     this.toggleButtonState();

//     this._inputList.forEach((inputElement) => {

//       inputElement.addEventListener('input', () => {
//         this._checkInputValidity(inputElement);
//         this.toggleButtonState();
//       });
//     });
//   };


//   enableValidation = () => {
//     this._formElementType.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     this._setEventListeners();
//   };

// }
