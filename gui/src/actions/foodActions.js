const SERVER = 'http://localhost:8080'

export function getFoods (userId) {
  return {
    type: 'GET_FOODS',
    payload: async () => {
      const response = await fetch(`${SERVER}/app/users/${userId}/foods`, {
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

export function addFoods (food, userId) {
    return {
        type: 'POST_FOODS',
        payload : async () => {
            console.log(userId)
            await fetch(`${SERVER}/app/users/${userId}/foods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(food)
            })
            const response = await fetch(`${SERVER}/app/users/${userId}/foods`, {
                method: 'GET'
            })
            const data = await response.json()
            console.log(data)
            return data
        }
    }
}

export function deleteFoods (id, userId) {
    return {
      type: 'DELETE_FOODS',
      payload: async () => {
        await fetch(`${SERVER}/app/users/${userId}/foods/${id}`, {
          method: 'delete'
        })
        const response = await fetch(`${SERVER}/app/users/${userId}/foods`, {
            method: 'GET'
        })
        console.log(response)
        if(response.statusText === 'OK') {
            const data = await response.json()
            return data
        } else {
            return []
        }

      }
    }
}