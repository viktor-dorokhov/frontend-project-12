const en = {
  translation: {
    main: {
      appName: 'Hexlet Chat',
      logout: 'Log out',
      loading: 'Загрузка...',
      errorNetwork: 'Network error',
    },
    unknownPage: {
      title: 'The page was not found',
      goto: 'But you can go to',
      mainPage: 'the main page',
    },
    channels: {
      channels: 'Channels',
      title: 'Manage channel',
      rename: 'Rename',
      remove: 'Remove',
      toast: {
        added: 'The channel has been created',
        renamed: 'The channel has been renamed',
        removed: 'The channel has been removed',
      },
    },
    messages: {
      counter: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
      placeholder: 'Enter a message...',
      send: 'Send',
      newMessage: 'New message',
    },
    login: {
      username: 'Your nickname',
      password: 'Password',
      submit: 'Login',
      title: 'Login',
      noAccount: 'No account?',
      signup: 'Sign up',
      errorAuth: 'Invalid username or password',
    },
    signup: {
      username: 'User name',
      password: 'Password',
      confirm: 'Confirm password',
      submit: 'Sign up',
      title: 'Sign up',
      back: 'Back',
      validation: {
        required: 'Required field',
        usernameLength: 'From 3 to 20 symbols',
        passwordLength: 'At least 6 characters',
        confirmPassword: 'Passwords must match',
        userExists: 'Such user already exists',
      },
    },
    modal: {
      addChannel: {
        title: 'Add channel',
        placeholder: 'Channel name',
      },
      renameChannel: {
        title: 'Rename channel',
        placeholder: 'Сhannel name',
      },
      removeChannel: {
        title: 'Remove channel',
        body: 'Are you sure?',
      },
      validation: {
        required: 'Required field',
        uniq: 'Must be unique',
        min: 'From 3 to 20 symbols',
        max: 'From 3 to 20 symbols',
      },
      buttons: {
        submit: 'Send',
        cancel: 'Cancel',
        remove: 'Remove',
      },
    },
    language: {
      title: 'Language',
      en: 'English',
      ru: 'Русский',
    },
    color: {
      title: 'Switch between dark and light theme (currently {{theme}} theme)',
      light: 'light',
      dark: 'dark',
    },
  },
};

export default en;
