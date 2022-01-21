import { useState } from 'react'

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if(tokenString !== 'undefined')
        {
            const userToken = JSON.parse(tokenString);
            return userToken
        }
        else return {token: "unset"}

    }


    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken)
    }

    return {
        setToken: saveToken,
        token
    }
}