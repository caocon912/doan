/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* GLOBAL FUNCTIONS
   ========================================================================== */

/**
 * Reload current browser link
 * It only works in Client Side Render, because window always existed
 * For Server Side Render, please check window first before any window's methods calls
 */
export const reload = () => {
  window.location.reload()
}

/**
 * Safely parse JSON format
 * @param jsonString input json string
 * @returns data in json format or undefined
 */
export const parseJSON = <T>(jsonString: string | null): T | null => {
  try {
    return jsonString === 'undefined' ? null : JSON.parse(jsonString ?? '')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Parsing error on ', { jsonString })
    return null
  }
}

/**
 * Get value from Session Storage by key
 * @param key to get value from Session Storage
 * @returns JSON data
 */
export const getFromSessionStorage = <T>(key: string): T | null => {
  const value = window.sessionStorage.getItem(key)

  if (value != null) {
    return parseJSON(value)
  }
  return null
}

/**
 * Get value from Local Storage by key
 * @param key to get value from Local Storage
 * @returns JSON data
 */
export const getFromLocalStorage = <T>(key: string): T | null => {
  const value = window.localStorage.getItem(key)

  if (value != null) {
    return parseJSON(value)
  }
  return null
}

/**
 * Set value to Local Storage by key
 * @param key to get value from Local Storage
 * @returns JSON data
 */
export const setToLocalStorage = (key: string, value: string): void => {
  return window.localStorage.setItem(key, value)
}

export const removeLocalStorage = (key: string): void => {
  return window.localStorage.removeItem(key)
}
export const removeAllLocalStorage = (): void => {
  return window.localStorage.clear()
}
