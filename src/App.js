import Login from './views/Login';
import HomeView from './views/homeView';


const code = new URLSearchParams(window.location.search).get('code');


function App() {
  return (

    
   code ? <HomeView code = {code} /> : <Login />

  );
}

export default App;
