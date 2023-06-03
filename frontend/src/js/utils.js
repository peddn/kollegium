import UIkit from 'uikit'

// TODO refactor in one function
export const uiNotification = (message, status, icon, pos) => {
  UIkit.notification({
    message: `<span uk-icon="icon: ${icon}"></span> ${message}`,
    status: status,
    pos: pos,
  })
}

export const uiErrorNotification = (error) => {
  UIkit.notification(
    '<span uk-icon="icon: error"></span> ' +
      error.name +
      '<br><p>' +
      error.message +
      '</p>',
  )
}

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
