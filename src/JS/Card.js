export class Card {
    constructor(name, link, container, popupImage, popupFullImage) {
        this.name = name;
        this.link = link;
        this.container = container;
        this.remove = this.remove.bind(this);
        this.card = null;
        this.popupImage = popupImage;
        this.popupFullImage = popupFullImage;
    }

    getTemplate() {
        const markup = `
    <div class="place-card">
      <div class="place-card__image data-src="">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>
    `;

        const element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', markup.trim());

        return element.firstChild;
    }

    create() {
        this.card = this.getTemplate();

        this.likeIcon = this.card.querySelector('.place-card__like-icon');
        this.deleteButton = this.card.querySelector('.place-card__delete-icon');
        this.image = this.card.querySelector('.place-card__image');

        this.card.querySelector('.place-card__name').textContent = this.name;
        this.image.style.backgroundImage = `url(${this.link})`;
        this.image.dataset.src = this.link;


        this.setEventListeners();

        return this.card;
    }

    setEventListeners() {
        this.likeIcon.addEventListener('click', this.like);
        this.deleteButton.addEventListener('click', this.remove);
        this.image.addEventListener('click', this.showImage);
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.likeIcon.removeEventListener('click', this.like);
        this.image.removeEventListener('click', this.showImage);
        this.deleteButton.removeEventListener('click', this.remove);

        this.container.removeChild(this.card);
    }

    showImage = (evt) => {
        const currentImage = evt.target;

        this.popupImage.open();
        this.popupFullImage.querySelector('.popup__image').setAttribute('src', currentImage.dataset.src);
    }
}