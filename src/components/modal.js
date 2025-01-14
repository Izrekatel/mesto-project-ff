function changeVisibilityPopup(popup) {
    popup.classList.toggle('popup_is-opened');
};

function addClosePopupListener(popup) {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            changeVisibilityPopup(popup);
            evt.stopImmediatePropagation();
        }
    });
}

export function documentEscapeListener () {
    const activePopup = document.querySelector('popup_is-opened')
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            changeVisibilityPopup(activePopup);
            evt.stopImmediatePropagation();
        }
    })};

export function showPopup(popup) {
    popup.classList.add('popup_is-animated');
    changeVisibilityPopup(popup);
    addClosePopupListener(popup);
    documentEscapeListener();
}

export function closePopup(popup) {
    changeVisibilityPopup(popup);
}