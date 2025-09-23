export function saveToken(token) {
  localStorage.setItem('jwt', token)
}

export function getToken() {
  return localStorage.getItem('jwt')
}

export function clearToken() {
  localStorage.removeItem('jwt')
}

export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch (e) {
    return null
  }
}





