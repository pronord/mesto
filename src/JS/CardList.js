export class CardList {
    constructor(container, createCard) {
        this.container = container;
        this.createCard = createCard;
        this.cardlist = null;
    }

    addCard(name, link) {
        const newCard = this.createCard(name, link);
        this.container.append(newCard);
    }

    render(arr) {
        arr.forEach(item => {
            this.addCard(item.name, item.link);
        });
    }
}