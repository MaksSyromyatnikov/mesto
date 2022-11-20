"use strict"
import Popup from "./Popup.js";


export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm){
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }


  // получаем данные инпутов из формы
  _getInputValues(){
    const inputValues = {};
      this._inputs.forEach((input) => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
  }

  setInputValues(data){
    console.log(this._inputs);
    this._inputs.forEach((input) => {
      console.log(input.name);
      console.log(input.value);
      input.value = data[input.name];
    })
    return this._inputs;
  }

  resetForm(){
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

}
