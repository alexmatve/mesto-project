const showInputError = (form, inputElement, errorMessage) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (form, inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
};

const checkInputValidity = (form, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(form, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__button_inactive");
    } else {
        buttonElement.classList.remove('popup__button_inactive');
    }
};

const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(form, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(form)
    })
};

