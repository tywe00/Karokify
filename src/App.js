import Login from './views/Login';
import { handleCodeExchange } from './utils/authorization';
import HomeView from './views/homeView';
import { useEffect } from 'react';

function App() {

  let token;

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const data = handleCodeExchange(code);
  }, []);

  return (
    token ? <HomeView code = {token} /> : <Login />
  );
}

export default App;
