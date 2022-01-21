const SERVER = 'http://localhost:8080'

export function getUserGroups (userId) {
    return {
        type: 'GET_USERGROUPS',
        payload: async () => {
          const response = await fetch(`${SERVER}/app/users/${userId}/group`, {
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

export function addUserGroup (username, userId) {
    console.log(username)
    return {
        type: 'PUT_USERGROUP',
        payload : async () => {
            console.log(userId)
            const responsePut = await fetch(`${SERVER}/app/users/${userId}/group`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(username)
            })
            if(responsePut.statusText === "Not Found") {
              alert("User not found!")
            }
            const response = await fetch(`${SERVER}/app/users/${userId}/group`, {
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


export function deleteUserGroup (id, userId) {
    console.log(id)
    return {
      type: 'DELETE_USERGROUP',
      payload: async () => {
        await fetch(`${SERVER}/app/users/${userId}/deleteUserFromGroup`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(id)
        })
        const response = await fetch(`${SERVER}/app/users/${userId}/group`, {
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