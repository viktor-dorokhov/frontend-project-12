const ru = {
  translation: {
    main: {
      appName: 'Slack чат',
      logout: 'Выйти',
      loading: 'Loading...',
      errorNetwork: 'Ошибка сети',
    },
    channels: {
      channels: 'Каналы',
      rename: 'Переименовать',
      remove: 'Удалить',
      toast: {
        added: 'Канал создан',
        renamed: 'Канал переименован',
        removed: 'Канал удален',
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
        placeholder: 'Название канала',
      },
      renameChannel: {
        title: 'Переименовать канал',
        placeholder: 'Новое название канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        body: 'Уверены?',
      },
      validation: {
        required: 'Обязательное поле',
        uniq: 'Должно быть уникальным',
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
      },
      buttons: {
        submit: 'Отправить',
        cancel: 'Отмена',
        remove: 'Удалить',
      },
    },
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    // END
  },
};

export default ru;
