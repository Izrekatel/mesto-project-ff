function changeVisibilityPopup(popup) {
    popup.classList.toggle('popup_is-opened');
    document.removeEventListener('keydown', addDocumentEscapeListener);
};

function addClosePopupListener(popup) {
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            changeVisibilityPopup(popup);
            evt.stopImmediatePropagation();
        }
    });
}

function addDocumentEscapeListener(evt) {
    const activePopup = document.querySelector('.popup_is-opened')
    if (evt.key === 'Escape' && activePopup) {
        changeVisibilityPopup(activePopup);
    }
}

export function showPopup(popup) {
    popup.classList.add('popup_is-animated');
    changeVisibilityPopup(popup);
    addClosePopupListener(popup);
    document.addEventListener('keydown', addDocumentEscapeListener);
}

export function closePopup(popup) {
    changeVisibilityPopup(popup);
}
