"use strict"
import Popup from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor (popupSelector) {
    super (popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._popup.querySelector(".popup__save-button_confirm");
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
    });
  }

  // изменение загрузки при отправке на сервер
  showLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Удаление...";
    } else {
      this._saveButton.textContent = "Да";
    }
  }
}
