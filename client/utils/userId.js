export const clearUserId = () => localStorage.removeItem('USER_ID', -1)

export const getUserId = () => localStorage.getItem('USER_ID')

export const setUserId = userId => localStorage.setItem('USER_ID', userId)