import React from 'react';
import HomeView from '../views/homeView.js';

function HomePresenter(props) {
  
  const data = {
    title: 'Karaokify Home Page',
    content: 'Welcome to the home page!'
  };

  return <HomeView data={data} />;
}

export default HomePresenter;