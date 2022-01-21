import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getUsers } from '../actions/userActions'
import "./UserList.css"
import NavHandler from '../NavHandler'

const userListSelector = state => state.user.users

const UserList = (props) => {
  const users = useSelector(userListSelector, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])

  return (
    <>
      <NavHandler />
      <div className='userPage'>
        
        <div className='users'>
          <h3>All users</h3>
          <ul>
            {
              users.map(e => (
                <li className='elementUser' key={e.id}>
                  {e.username}
                </li>
              ))
            }
          </ul>

        </div>
      </div>
    </>
    
  )
}

export default UserList