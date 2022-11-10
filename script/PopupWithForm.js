"use strict"
import Popup from "./Popup.js";

import {
  popupImage,
  popupImageFull,
  popupImageSubtitle
} from "./constants.js";


export class PopupWithForm extends Popup {
  constructor({submitForm}){
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues(){

  }
}
