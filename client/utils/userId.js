export const clearUserId = () => localStorage.removeItem('USER-ID', null)

export const getUserId = () => localStorage.getItem('USER-ID')

export const setUserId = userId => localStorage.setItem('USER-ID', userId)