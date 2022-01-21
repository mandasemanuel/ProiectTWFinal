import { combineReducers } from 'redux'

import userList from './userList-reducer'
import foodList from './foodList-recuder'
import groupList from './groupList-reducer'
import friendList from './friendList-reducer'

export default combineReducers({
  user: userList,
  food: foodList,
  group: groupList,
  friend: friendList
})