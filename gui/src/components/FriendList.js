import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import "./FriendList.css"

import { getFriends } from '../actions/friendActions'
import NavHandler from '../NavHandler'

const friendListSelector = state => state.friend.friends

const FriendList = (props) => {
  const {userId} = props
  const SERVER = 'http://localhost:8080'
  const friends = useSelector(friendListSelector, shallowEqual)

  const [friendsFood, setFriendsFood] = useState([])
  const [friendId, setFriendId] = useState(0)

  const getFriendsFood = async (friendId, friendName) => {
      const response = await fetch(`${SERVER}/app/users/${friendId}/friendFoods`, {
        method: 'GET'
      })
      if(response.statusText === 'OK') {
        const data = await response.json()
        setFriendsFood(data);
      } else {
        setFriendsFood([])
      }
      setFriendId(friendId)

      
}

  const handleClaim = async (foodId, userId) => {
    await fetch(`${SERVER}/app/foods/${foodId}/${userId}`,{
      method: 'PUT'
    })
    getFriendsFood(friendId);

  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFriends(userId))
  },[dispatch])

  return (

    <>
      <NavHandler />

      <div className='friendsPage'>
        <div className='friends'>
          <h3>Your friends</h3>
          <ul>
            {
              friends.map(e => (
                <li className='friendElement' key={e.id}>
                  {e.username}
                  <input type='button' value='View Food' onClick={() => getFriendsFood(e.id, e.username)} />
                </li>
              ))
            }
          </ul>
        </div>

        <div className='friendsFood'>
          <h3>Selected user's food</h3>
          <ul>
            {
              friendsFood.map(e => (
                <li className='friendElement' key={e.id}>
                  {e.name + ", " + e.category}
                  <input className='btnClaim' type='button' value='Claim' onClick={() => handleClaim(e.id, userId)}/>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
    
)
}

export default FriendList