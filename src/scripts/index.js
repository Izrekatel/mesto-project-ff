import { fillCard } from "../components/card.js"
import { showPopup, closePopup } from "../components/modal.js"
import ".././styles/index.css"

import { enableValidation, clearValidation } from "../components/validation.js"
import {
  getIinitialCards,
  getUserData,
  patchUserData,
  postNewCard,
  patchAvatar,
} from "../components/api.js"

const container = document.querySelector(".content")
const cardContainer = container.querySelector(".places__list")
const profileEditButton = container.querySelector(".profile__edit-button")
const popupEdit = document.querySelector(".popup_type_edit")
const profileAddButton = container.querySelector(".profile__add-button")
const popupNewCard = document.querySelector(".popup_type_new-card")
const popupCardImage = document.querySelector(".popup_type_image")
const profileImage = container.querySelector(".profile__image")
const profileTtitle = container.querySelector(".profile__title")
const profileDescription = container.querySelector(".profile__description")
const profileForm = popupEdit.querySelector(".popup__form")
const inputName = profileForm.querySelector(".popup__input_type_name")
const inputDescription = profileForm.querySelector(
  ".popup__input_type_description"
)
const cardForm = popupNewCard.querySelector(".popup__form")
const inputCardName = cardForm.querySelector(".popup__input_type_card-name")
const inputCardLink = cardForm.querySelector(".popup__input_type_url")
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar")
const avatarCardForm = popupChangeAvatar.querySelector(".popup__form")
const inputAvatarLink = avatarCardForm.querySelector(".popup__input_type_url")

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  const newUserData = {
    profileTtitle: inputName.value,
    profileDescription: inputDescription.value,
  }
  const popupButton = popupChangeAvatar.querySelector(".popup__button")
  const buttonText = popupButton.textContent
  renderLoading(popupButton)
  patchUserData(newUserData).finally(() => {
    renderLoading(popupButton, buttonText)
  })
  profileTtitle.textContent = newUserData.profileTtitle
  profileDescription.textContent = newUserData.profileDescription
  closePopup(popupEdit)
}

function addCard({ cardElement, prepend = false }) {
  if (prepend) {
    cardContainer.prepend(cardElement)
  } else {
    cardContainer.append(cardElement)
  }
  return cardElement
}

function addCardImageClickListener(cardElement) {
  const cardImage = cardElement.querySelector(".card__image")
  cardImage.addEventListener("click", () => {
    const popupImg = popupCardImage.querySelector(".popup__image")
    const popupCaption = document.querySelector(".popup__caption")
    popupImg.src = cardImage.src
    popupImg.alt = cardImage.alt
    popupCaption.textContent = cardImage.alt
    showPopup(popupCardImage)
  })
}

function handleCardFormSubmit(evt) {
  evt.preventDefault()
  const element = {}
  element.name = inputCardName.value
  element.link = inputCardLink.value
  const popupButton = popupNewCard.querySelector(".popup__button")
  const buttonText = popupButton.textContent
  renderLoading(popupButton)
  postNewCard(element)
    .then((res) => {
      addCard({
        cardElement: fillCard({
          element: res,
          cardImageClickListener: addCardImageClickListener,
          userId: profileTtitle.userId,
        }),
        prepend: true,
      })
    })
    .finally(() => {
      renderLoading(popupButton, buttonText)
    })
  cardForm.reset()
  clearValidation({ form: cardForm, validationConfig: validationConfig })
  closePopup(popupNewCard)
}

function handleChangeAvatarFormSubmit(evt) {
  evt.preventDefault()
  const popupButton = popupChangeAvatar.querySelector(".popup__button")
  const buttonText = popupButton.textContent
  renderLoading(popupButton)
  patchAvatar(inputAvatarLink.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      avatarCardForm.reset();
      clearValidation({ form: avatarCardForm, validationConfig: validationConfig });
      closePopup(popupChangeAvatar);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(popupButton, buttonText)
    })
}

function renderLoading(popupButton, text = "Coхранение...") {
  popupButton.textContent = text
}

profileEditButton.addEventListener("click", () => {
  inputName.value = profileTtitle.textContent
  inputDescription.value = profileDescription.textContent
  clearValidation({ form: profileForm, validationConfig: validationConfig })
  showPopup(popupEdit)
})

profileAddButton.addEventListener("click", () => showPopup(popupNewCard))
profileForm.addEventListener("submit", handleProfileFormSubmit)
cardForm.addEventListener("submit", handleCardFormSubmit)
profileImage.addEventListener("click", () => showPopup(popupChangeAvatar))
avatarCardForm.addEventListener("submit", handleChangeAvatarFormSubmit)

enableValidation(validationConfig)

Promise.all([getUserData(), getIinitialCards()])
  .then(([userData, initialCards]) => {
    profileTtitle.textContent = userData.name
    profileDescription.textContent = userData.about
    profileImage.style.backgroundImage = `url('${userData.avatar}')`
    profileTtitle.userId = userData._id

    initialCards.forEach(function (element) {
      const createdCard = fillCard({
        element: element,
        cardImageClickListener: addCardImageClickListener,
        userId: userData._id,
      })
      addCard({ cardElement: createdCard })
    })
  })
  .catch((err) => {
    console.log(err)
  })
