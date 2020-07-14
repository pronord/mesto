class Popup {
  constructor(container) {
    this.container = container;
    this.close = this.close.bind(this)
    this.popup = null; 
  }

  open() {
    this.container.classList.add('popup_is-opened');
    this.setEventListener();
  }

  close() {
    this.container.classList.remove('popup_is-opened');
    this.removeEventListener();
  }

  setEventListener() {
    this.container.querySelector('.popup__close').addEventListener('click', this.close);
    
    // закрытие по клику вне попапа
    this.container.addEventListener('click', () => {
      event.target.isEqualNode(this.container) && this.close();
    })

    // закрытие по нажатию ESC
    document.addEventListener('keydown', () => {
      if (event.keyCode == 27) {
            this.close();
          }
    })
  }

  removeEventListener() {
    this.container.querySelector('.popup__close').removeEventListener('click', this.close);
    this.container.removeEventListener('click', (evt) => {
      event.target.isEqualNode(this.container) && this.close();
    });
    document.removeEventListener('keydown', () => {
      if (event.keyCode == 27) {
            this.close();
          }
    })
  }

}