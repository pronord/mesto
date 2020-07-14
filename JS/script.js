(function() {
  /** КОНСТАНТЫ */

  // контейнер карточек
  const places = document.querySelector('.places-list');
  // кнопки
  const addButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit');
  // попапы
  const popupAddCard = document.getElementById('addCard');
  const popupEditInfo = document.getElementById('editInfo');
  const popupFullImage = document.querySelector('#fullImage');
  // форма добавление карточки
  const formAdd = document.forms.new;
  const inputName = formAdd.elements.name;
  const inputLink = formAdd.elements.link;
  // форма редактирования информации о пользователе
  const formEdit = document.forms.userInfo;
  const inputUserName = formEdit.elements.userName;
  const inputUserAbout = formEdit.elements.userAbout;
  const userName = document.querySelector('.user-info__name');
  const userAbout = document.querySelector('.user-info__job');
  const userPhoto = document.querySelector('.user-info__photo');
  //конфиг для API
  const config = {
    baseUrl: 'https://praktikum.tk/cohort11',
    key: 'ab3768c2-28ea-4cee-ab0d-152a0b14a0dc'
  }
 

  /** ИНСТАНСЫ */

  // передача контейнеров для попапов
  const popupAdd = new Popup(popupAddCard);
  const popupEdit = new Popup(popupEditInfo);
  const popupImage = new Popup(popupFullImage);

  // валидация форм
  const formValidationAdd = new FormValidator(formAdd)
  const formValidationEdit = new FormValidator(formEdit)

  // инстанс запросов к серверу
  const api = new Api(config.baseUrl, config.key);

  // данные для информации о пользователе
  const userInfo = new UserInfo(userName, userAbout, userPhoto, api, popupEdit);

  // контейнер карточек
  const cardList = new CardList(places, createCard);


  /** МЕТОДЫ КЛАССОВ */

  // создание списка карточек
  api.getCards()
  .then(res => {
    cardList.render(res);
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })
 

  // получение данных о пользователе с сервера
  api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
    userInfo.updateRender()
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })
 

  /** КОЛБЭКИ */

  // создаю колбэк, возвращающий разметку карточки
  function createCard(name, link) {
    return new Card(name, link, places, popupImage, popupFullImage).create();
  }


  //** СЛУШАТЕЛИ СОБЫТИЙ */

  // кнопка "+"
  addButton.addEventListener('click', function () {
    popupAdd.open();
    formAdd.reset();
    formValidationAdd.setSubmitButtonState(false);
    formValidationAdd.clearErrors();
  });

  // кнопка "edit"
  editButton.addEventListener('click', function () {
    popupEdit.open();

    const getUserInfo = userInfo.getUserInfo();

    inputUserName.value = getUserInfo.name;
    inputUserAbout.value = getUserInfo.job;

    formValidationEdit.setSubmitButtonState(true);
    formValidationEdit.clearErrors();
  });

  // слушатели для формы добавления карточки
  formAdd.addEventListener('submit', (event) => {
    event.preventDefault();
      cardList.addCard(inputName.value, inputLink.value);
      formAdd.reset();
      popupAdd.close();
  });

  formAdd.addEventListener('input', (e) => {
    formValidationAdd.setEventListeners(e);
  }, true);

  // слушатели для формы редактирования профиля
  formEdit.addEventListener('submit', (event) => {
    event.preventDefault();
    userInfo.saveToServer(inputUserName.value, inputUserAbout.value);
  });

  formEdit.addEventListener('input', (e) => {
    formValidationEdit.setEventListeners(e)
  }, true);
})()




/*
Здравствуйте

Карточки с сервера загружаются, данные пользователя сохраняются, с этим
все отлично, но к организации кода есть несколько замечаний:

Надо исправить:
- + передавать базовый адрес сервера и ключ авторизации как параметры конструктора класса Api
и в методах использовать переданные значения, а не хардкодить их
- + обработка ошибок catch должна быть в самом конце обработки промиса, а не в классе Api
Класс Api не может знать, что делать в случае ошибки при том или ином запросе
- + при нажатии кнопки сохранить формы профиля закрывать попап только если сервер ответил подтверждением выполнения
запроса, если запрос завершился ошибкой, а попап закрылся пользователь может ошибочно подумать, что данные сохранились
- + при добавлении карточки падает ошибка Uncaught ReferenceError: cardList is not defined
Хотя карточки не отправляются на сервер, функционал реализованный в прошлых заданиях не должен ломаться

Можно лучше:
- + проверка ответа сервера и преобразование из json
дублируется во всех методах класса Api, лучше вынести в отдельный метод

Наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:
  Надо исправить:
  - + метод addCardFromForm убрать из класса CardList, а его содержимое разместить в обработчике formAdd.addEventListener('submit', (event) => {
  - + когда код расположен в разных файлах, его нужно
  заключать в модули, т.к. если файлов будет много, то в разных
  файлах могут появится функции или переменные с одинаковыми именами,
  они будут переопределять друг друга. Модуль должен предоставлять
  наружу только минимально необходимый api
  Для создании модулей можно воспользоваться IIFE, подробнее:
  https://learn.javascript.ru/closures-module
  https://habr.com/ru/company/ruvds/blog/419997/
  Нужно обернуть в модули как минимум содержимое файла script.js
  Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
  и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов

Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами при выполнении заданий и сдачи проектных и дипломной работы

*/

/*
    Большинство замечаний исправлено, но обработка ошибок сделана не верно
    
    + Надо исправить:
    Вместо одного запроса отправляется два.
    У первого запроса есть блок then, а у второго запроса есть блок catch
    Блоки then и cath должны быть у одного запроса:
    
    api.getCards()     //запрос к серверу
      .then(res => {
        .............. //сюда попадаем если запрос выполнился успешно
      })
      .catch(err => {  
        .............. //сюда попадаем если запрос завершился ошибкой
      })

*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/