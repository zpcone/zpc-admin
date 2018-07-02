import Cookies from 'js-cookie'

const TokenKey = 'JSESSIONID'
const userIdKey = 'backUserId'
const sessionIdKey = 'JSESSIONID'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUserId() {
  return Cookies.get(userIdKey)
}

export function setUserId(userId) {
  return Cookies.set(userIdKey, userId, {
    expires: 0.5
  })
}

export function removeUserId() {
  return Cookies.remove(userIdKey)
}

export function getSessionId() {
  return Cookies.get(sessionIdKey)
}

export function setSessionId(sessionId) {
  return Cookies.set(sessionIdKey, sessionId)
}

export function removeSessionId() {
  return Cookies.remove(sessionIdKey)
}
