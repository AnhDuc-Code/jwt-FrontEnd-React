import './App.scss';
import Header from "./components/Header/Header"
import { Outlet } from 'react-router-dom';
const App = () => {


  return (
    <>
      <div className='Header-container'>
        <Header />
      </div>
      <div className='App-container'>
      </div>
      <div className='app-content'>
        <Outlet />
      </div>
    </>
  );
}

export default App;
