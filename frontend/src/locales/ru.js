const ru = {
  translation: {
    main: {
      appName: 'Hexlet Chat',
      logout: 'Выйти',
      loading: 'Loading...',
      errorNetwork: 'Ошибка соединения',
    },
    channels: {
      channels: 'Каналы',
      title: 'Управление каналом',
      rename: 'Переименовать',
      remove: 'Удалить',
      name: 'Имя канала',
      toast: {
        added: 'Канал создан',
        renamed: 'Канал переименован',
        removed: 'Канал удалён',
      },
    },
    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
    },
    login: {
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      title: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Зарегистрироваться',
      errorAuth: 'Неверные имя пользователя или пароль',
    },
    signup: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirm: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      title: 'Регистрация',
      back: 'Вернуться назад',
      validation: {
        required: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },
    },
    modal: {
      addChannel: {
        title: 'Добавить канал',
        placeholder: 'Имя канала',
      },
      renameChannel: {
        title: 'Переименовать канал',
        placeholder: 'Имя канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        body: 'Уверены?',
      },
      validation: {
        required: 'Обязательное поле',
        uniq: 'Должно быть уникальным',
        length: 'От 3 до 20 символов',
      },
      buttons: {
        submit: 'Отправить',
        cancel: 'Отмена',
        remove: 'Удалить',
      },
    },
    language: {
      title: 'Язык',
      en: 'English',
      ru: 'Русский',
    },
    color: {
      title: 'Переключение между темной и светлой темой (сейчас {{theme}} тема)',
      light: 'светлая',
      dark: 'темная',
    },
  },
};

export default ru;
