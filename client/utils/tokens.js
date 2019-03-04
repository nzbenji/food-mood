// These consts handle the addition, modification or deletion of stored token data items
    
// When invoked, will empty all the keys out of the local storage
export const clearToken = () => localStorage.removeItem('ACCESS-TOKEN', null)
// When passed a key name, will return that key's value
export const getToken = () => localStorage.getItem('ACCESS-TOKEN')
// When passed a key name and value, will add that key to localStorage
export const setToken = token => localStorage.setItem('ACCESS-TOKEN', token)
