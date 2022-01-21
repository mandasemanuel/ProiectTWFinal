import React from "react";
import Dashboard from './components/Dashboard'
import Preferences from './components/Preferences'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Login from "./components/Login";
import useToken from "./useToken";
import UserList from "./components/UserList";
import FoodList from "./components/FoodList"
import GroupList from "./components/GroupList";
import FriendList from "./components/FriendList";
import NavHandler from "./NavHandler";
import NotFound from "./components/NotFound";
import {FacebookButton, FacebookCount} from "react-social"


function App() {


  const { token, setToken } = useToken();
  const url = "https://www.youtube.com"

  if(!token || token.token === 'unset'){
    return <Login setToken={setToken} />
  }

  return (
    <div>      
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            {<Route path="/" element={<NavHandler />}>
            </Route>}
            {<Route path="/users" element={<UserList />}>
            </Route>}
            {<Route path="/group" element={<GroupList userId={token.id} MainUser={token.username} />}>
            </Route>}
            {<Route path="/friends" element={<FriendList userId={token.id}/>}>
            </Route>}
            {<Route path="/food" element={<FoodList userId={token.id}/>}>
            </Route>}
            {<Route path="*" element={<NotFound />}>
            </Route>}
          </Routes>
        </BrowserRouter>
      </div>
      <div className="userDetails">
          <p> User: {token.username}</p>
          <button className="logout" onClick={() => {
          setToken({token: "unset"})
          }}>Log out</button>
          <div>
            <FacebookButton url={url} appId={427362375782592}>
              <FacebookCount url={url} />
              {" Share"}
            </FacebookButton>
          </div>

      </div>
    </div>
    
  );
}

export default App;
