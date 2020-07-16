export class FormValidator {
    constructor(form) {
        this._form = form;
        this._button = this._form.querySelector('.button');
        this._errorElements = this._form.querySelectorAll('.error');
    }

    checkInputValidity = (input) => {
        const errorMessages = {
            empty: 'Это обязательное поле',
            wrongLength: 'Должно быть от 2 до 30 символов',
            wrongUrl: 'Здесь должна быть ссылка',
        }

        input.setCustomValidity(""); //устанавливаем свойсво validity.customError в false

        if (input.validity.valueMissing) { //проверка на заполненное поле
            input.setCustomValidity(errorMessages.empty);
            return false
        }

        if (input.validity.tooShort || input.validity.tooLong) { //проверка на соответсвие кол-ва символов
            input.setCustomValidity(errorMessages.wrongLength);
            return false
        }

        if (input.validity.typeMismatch && input.type === 'url') { //проверка на email
            input.setCustomValidity(errorMessages.wrongUrl);
            return false
        }

        return input.checkValidity();
    }


    isFieldValid = (event) => {
        const errorElem = event.target.parentNode.querySelector(`#${event.target.id}-error`);
        this.checkInputValidity(event.target); // устанавливаем инпуту кастомные ошибки, если они есть.

        errorElem.textContent = event.target.validationMessage;
    }

    setEventListeners(evt) {

        this.isFieldValid(evt); // проверяем поле на валидность и выводим ошибку если не валидно

        if (this._form.checkValidity()) { // если каждый инпут формы вернул true, то включаем кнопку
            this.setSubmitButtonState(true);
        } else {
            this.setSubmitButtonState(false);
        }

    }

    setSubmitButtonState(state) {
        if (state) {
            this._button.removeAttribute('disabled');
            this._button.classList.add(`popup__button_valid`);
            this._button.classList.remove(`popup__button_invalid`);
        } else {
            this._button.setAttribute('disabled', true);
            this._button.classList.add(`popup__button_invalid`);
            this._button.classList.remove(`popup__button_valid`);
        }
    }

    clearErrors() {
        this._errorElements.forEach(error => error.textContent = "");
    }
}