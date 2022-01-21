import React from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import { useNavigate } from 'react-router';



export default function NavHandler() {

    const navigate = useNavigate();



    return (
        <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId=""
            onSelect={({itemId}) => {
              navigate(itemId);
            }}
            items={[
              {
                title: 'Home',
                itemId: '/'
              },
              {
                title: 'Users',
                itemId: '/users'
              },
              {
                title: 'Your group',
                itemId: '/group',
              },
              {
                title: 'Your friends',
                itemId: '/friends',
              },
              {
                title: 'Your food',
                itemId: '/food',
              },
            ]}
          />
      </>
    )
}