import { deleteCard, putLike, deleteLike } from "../components/api.js"

function addCardTemplateClone() {
  const cardTemplate = document.querySelector("#card-template").content
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true)
  return cardElement
}

function addCardDeleteButtonListener(cardElement, cardId) {
  const cardDeleteButton = cardElement.querySelector(".card__delete-button")
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardId)
    cardElement.remove()
  })
}

function addCardLikeButtonListener(cardElement, element, userId) {
  const cardLikeButton = cardElement.querySelector(".card__like-button")
  const cardLikeCounter = cardElement.querySelector(".card__like-counter")

  const isLiked = element.likes.some((like) => like._id === userId)
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active")
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active")
  }

  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(element._id).then((element) => {
        cardLikeCounter.textContent = element.likes.length
      })
    } else {
      putLike(element._id).then((element) => {
        cardLikeCounter.textContent = element.likes.length
      })
    }
    cardLikeButton.classList.toggle("card__like-button_is-active")
  })
}

function disableDeleteButton(cardElement) {
  const cardDeleteButton = cardElement.querySelector(".card__delete-button")
  cardDeleteButton.classList.add("card__delete-button-disabled")
}

export function fillCard({ element, cardImageClickListener, userId }) {
  const cardElement = addCardTemplateClone()
  const cardImage = cardElement.querySelector(".card__image")
  const cardLikeCounter = cardElement.querySelector(".card__like-counter")
  cardImage.src = element.link
  cardImage.alt = element.name
  cardElement.querySelector(".card__title").textContent = element.name
  if (userId !== element.owner._id) {
    disableDeleteButton(cardElement)
  } else {
    addCardDeleteButtonListener(cardElement, element._id)
  }
  addCardLikeButtonListener(cardElement, element, userId)
  cardImageClickListener(cardElement)
  cardLikeCounter.textContent = element.likes.length
  return cardElement
}
