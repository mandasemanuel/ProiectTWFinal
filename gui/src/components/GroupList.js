import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { getUserGroups, deleteUserGroup, addUserGroup } from '../actions/groupActions'

import "./GroupList.css"
import NavHandler from '../NavHandler'

const userGroupListSelector = state => state.group.groups

const GroupList = (props) => {

  const [username, setUsername] = useState();  
  
  const {userId, MainUser} = props

  const groups = useSelector(userGroupListSelector, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserGroups(userId))
  }, [dispatch])

  const handleSubmitUserGroup = async e => {
    e.preventDefault()
    const usernames = groups.map (e => e.username)
    console.log(username + "      -----    " + MainUser)
    if(username != MainUser) {
        if(!usernames.includes(username)){
          const usernameObj = {
              username: username
          }
          dispatch(addUserGroup(usernameObj, userId))
        } else {
          alert("You already have that user in your group!")
        }
    } else {
      alert("You can't add yourself to the group!")
    }

  }

  const handleDelete = id => {
      console.log(id)
      const idObj = {
          idp: id
      }
      dispatch(deleteUserGroup(idObj,userId))
  }

  return (
    <>
      <NavHandler />
      <div  className='groupPage'>
        
        <div className='addUser-wrapper'>
              <h3>Add user to your group</h3>
              <form onSubmit={handleSubmitUserGroup}>
                  <label>
                      <p>Username</p>
                      <input type='text' onChange={e => setUsername(e.target.value)} />
                  </label>
                  <div>
                      <button type='submit'>Submit</button>
                  </div>
              </form>
        </div>

        <div className='group'>
          <h3>Your group</h3>
          <ul>
            {
              groups.map(e => (
                <li className='groupElement' key={e.id}>
                  {e.username}
                  <input type='button' value='Remove' onClick={() => handleDelete(e.id)} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
    
  )
}

export default GroupList