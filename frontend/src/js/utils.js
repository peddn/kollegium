import UIkit from 'uikit'

// TODO refactor in one function
export const uiErrorNotification = (error, description) => {
  UIkit.notification(
    '<span uk-icon="icon: error"></span> ' +
      error.name +
      '<br><p>' +
      error.message +
      '</p>'
  )
}
