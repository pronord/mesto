class CardList {
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

  /*
    + Надо исправить: 
     Класс CardList должен только хранить карточки добавлять их в контейнер,
     и не должен знать о форме, валидации, попапе и т.д.
     Тем более в классе CardList используется глобально созданый экземпляр cardList
     Такого не должно быть, все необходимое классу должно передаваться как параметры
     метода или конструктора, а не использовать глобальные переменные внутри класса

     Метод addCardFromForm убрать из класса CardList, а его содержимое разместить
     в обработчике formAdd.addEventListener('submit', (event) => {
  */
}