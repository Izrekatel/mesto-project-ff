function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
}

function addCardLikeButtonListener(cardElement) {
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });
};

export function fillCard({element, cardImageClickListener}) {
    const cardElement = addCardTemplateClone();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    addCardDeleteButtonListener(cardElement);
    addCardLikeButtonListener(cardElement);
    cardImageClickListener(cardElement);
    return cardElement;
}

