export const clearUserId = () => localStorage.removeItem('USER_ID', null)

export const getUserId = () => localStorage.getItem('USER_ID')

export const setUserId = userId => localStorage.setItem('USER_ID', userId)