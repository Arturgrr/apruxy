import i18next from 'i18next'

i18next.init({
  fallbackLng: 'en-US',
  resources: {
    'en-US': {
      translation: require('./en-US.json'),
    },
    'pt-BR': {
      translation: require('./pt-BR.json'),
    },
  },
})

const translator = i18next
export { translator }
