import './App.scss';
import Header from "./components/Header/Header"
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
}

export default App;
