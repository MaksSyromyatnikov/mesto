"use strict";

const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const closeButton = popupContainer.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openPopup() {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", onDocumentKeyUp);
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function onDocumentKeyUp(event) {
  if (event.key === "Escape") {
    closePopup();
  } else {
    handleProfileFormSubmit();
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
