import originalAxios from 'axios'

/**
 * Create our instance of axios which will, by default
 * set and send cookies when communicating to the server
 */
const axios = originalAxios.create({
  withCredentials: true
})

export default axios
