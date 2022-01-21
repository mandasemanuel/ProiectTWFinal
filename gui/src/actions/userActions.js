const SERVER = 'http://localhost:8080'

export function getUsers () {
    return {
      type: 'GET_USERS',
      payload: async () => {
        const response = await fetch(`${SERVER}/app/users`)
        const data = await response.json()
        return data
      }
    }
  }