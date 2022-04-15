// объявление форм страницы
const addUserForm = document.forms.profile;
const addPlaceForm = document.forms.place;

//объект с ошибками
const ERRORS = {
  wrongUrl: 'Введите адрес сайта',
  wrongLength: `Введите значение от 2 до 40 символов`,
  empty: 'Вы пропустили это поле'
}

//проверка валидности инпутов
const checkInputValidity = (input) => {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity(ERRORS.empty);
    return false;
  }

  if (input.validity.tooLong || input.validity.tooShort){
    input.setCustomValidity(ERRORS.wrongLength);
    return false;
  }

  if (input.validity.typeMismatch && input.type === 'url'){
    input.setCustomValidity(ERRORS.wrongUrl);
    return false;
  }

  return input.checkValidity();
}

// валидируем инпут
const validateInput = (input) => {
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);

  checkInputValidity(input);

  errorElement.textContent = input.validationMessage;

}


const handleInput = (evt) => {
  const currentForm = evt.currentTarget;
  const input = evt.target;
  const submitButton = currentForm.querySelector('.popup__save-button');

  if (!currentForm.checkValidity()) {
    submitButton.disabled = true;
    submitButton.classList.add('popup__save-button_disabled');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('popup__save-button_disabled');
  }

  validateInput(input);
}

const handleSubmitForm = (evt) => {
  evt.preventDefault();

  const currentForm = evt.target;

  if (currentForm.checkValidity()){
    currentForm.reset();
  }
}


addPlaceForm.addEventListener('submit', handleSubmitForm);
addUserForm.addEventListener('submit', handleSubmitForm);

addUserForm.addEventListener('input', handleInput);
addPlaceForm.addEventListener('input', handleInput);


