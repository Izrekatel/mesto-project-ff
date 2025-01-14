function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

export function fillCard(element) {
    const cardElement = addCardTemplateClone();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    return cardElement;
}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
}

export function addCard(cardElement, cardContainer, prepend=false) {
    addCardDeleteButtonListener(cardElement);
    if (prepend) {
        cardContainer.prepend(cardElement);
    }
    else {
        cardContainer.append(cardElement);
    }
    return cardElement;
}

export function addCardLikeButtonListener(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');;
    }
};