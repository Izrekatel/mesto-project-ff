const showInputError = (
    formElement, inputElement, errorMessage, inputErrorClass, errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};
  
const hideInputError = (
    formElement, inputElement, inputErrorClass, errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
const checkInputValidity = (
    formElement, inputElement, inputErrorClass, errorClass
) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
       inputElement.setCustomValidity("");
    } 

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement,
            inputElement.validationMessage, inputErrorClass, errorClass
        );
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
};
  
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    }
    else {
        buttonElement.classList.remove(inactiveButtonClass);
    };
};
  
const setEventListeners = (formElement, inputSelector,
    submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass
) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(
                formElement, inputElement, inputErrorClass, errorClass
            );
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};
  
export const enableValidation = ({
    formSelector, inputSelector, submitButtonSelector, inactiveButtonClass,
    inputErrorClass, errorClass
}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, inputSelector, submitButtonSelector,
            inactiveButtonClass, inputErrorClass, errorClass
        );
    });
};

export const clearValidation = ({form, validationConfig}) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    })
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
};