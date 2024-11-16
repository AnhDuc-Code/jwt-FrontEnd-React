import './App.scss';
import Header from "./components/Header/Header"
import { Outlet } from 'react-router-dom';
const App = () => {


  return (
    <div className='App-container'>
      <div className='Header-container'>
        <Header />
      </div>
      <div className='App-container'>
      </div>
      <div className='app-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
