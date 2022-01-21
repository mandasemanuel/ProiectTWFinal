const SERVER = 'http://localhost:8080'

export function getFriends (userId) {
    return {
        type: 'GET_FRIENDS',
        payload: async () => {
          const response = await fetch(`${SERVER}/app/users/${userId}/friends`, {
              method: 'GET'
          })
          if(response.statusText === 'OK') {
            const data = await response.json()
            return data
        } else {
            return []
        }
        }
    }
}