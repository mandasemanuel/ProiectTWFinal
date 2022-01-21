import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { getFoods, deleteFoods, addFoods } from '../actions/foodActions'

import "./FoodList.css"
import NavHandler from '../NavHandler'

const foodListSelector = state => state.food.foods

const FoodList = (props) => {
  const { userId } = props  
  const SERVER = 'http://localhost:8080'
 
  const [name, setName] = useState();
  const [available, setAvailable] = useState(true)
  const [category, setCategory] = useState('nespecificat')

  const [claimedFood, setClaimedFood] = useState([])

  const [friendName, setFriendName] = useState("not yet")
  const [friendId, setFriendId] = useState(0)

  const [claimedFoodFinal, setClaimedFoodFinal] = useState([])

  const handleClaimedFood = async (userId) => {
    const response = await fetch(`${SERVER}/app/claimedFoods/${userId}`, {
      method: 'GET'
    })
    if(response.statusText === 'OK') {
      const data = await response.json()
      setClaimedFood(data);

      let claimedFoodFinal1 = []
      
      for(let food of data) {
        const response = await fetch(`${SERVER}/app/users/${food.UserId}`, {
          method: 'GET'
        })
        const data1 = await response.json();
        claimedFoodFinal1.push({
          foodFinal: food,
          username: data1.username
        })
        

      }
      setClaimedFoodFinal(claimedFoodFinal1)
    } else {
      setClaimedFood([])
    }

  }

  const handleUnclaim = async (foodId) => {
    await fetch(`${SERVER}/app/foods/${foodId}`,{
      method: 'PUT'
    })
    handleClaimedFood(userId)

  }

  const options = [{
    label: 'Unspecified',
    value: 'Unspecified'
  },
  {
    label: 'Meat',
    value: 'Meat'
  },
  {
    label: 'Vegan',
    value: 'Vegan'
  }]

  
  const foods = useSelector(foodListSelector, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFoods(userId))
  }, [dispatch])

  const handleSubmitFood = async e => {
    e.preventDefault()
    const food = {
        name: name,
        available: available,
        category: category
    }
    console.log(userId + "in food list")
    dispatch(addFoods(food, userId))
    console.log(foods)
  }

  return (

    <>
      <NavHandler />

      <div className='foodPage'>
        <div className='addFood-wrapper'>
            <h3>Add food to your list</h3>
            <form onSubmit={handleSubmitFood}>
                <label>
                    <p>Food name</p>
                    <input type='text' onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <p>Category</p>
                    <select onChange={(evt) => setCategory(evt.target.value)}>
                        {
                            options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </label>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>

        <div className='foods'>
          <h3>Your food</h3>
          <ul>
            {
              foods.map(e => (
                <li className='foodItem' key={e.id}>
                  {e.name + ", " + e.category}
                  <input type='button' value='Remove' onClick={() => dispatch(deleteFoods(e.id, userId))} />
                </li>
              ))
            }
          </ul>
        </div>

        <div className='claimedFoods'>
          <h3>Claimed food</h3>
          <input type='button' value='Refresh claimed foods' onClick={() => handleClaimedFood(userId)} />
          <ul>
            {
              claimedFoodFinal.map(e => (
                <li className='foodItem' key={e.foodFinal.id}>
                  {e.foodFinal.name + ", " + e.foodFinal.category + " from " + e.username}
                  <input type='button' value='Unclaim' onClick={() => handleUnclaim(e.foodFinal.id)}/>
                </li>
              ))
            }
          </ul>
        </div>
        

        
    
      </div>
    </>

  )
}

export default FoodList