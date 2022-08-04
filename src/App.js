import './App.css';
import Registration from './Registration';

import { BrowserRouter, Route, Routes, privateRoute } from 'react-router-dom';
import Login from './Login';

import PostData from './PostData';
import Getpostdata from './Getpostdata';

import Getpost from './Getpost';
import PrivateRoutes from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route exact element={<PrivateRoutes />}> 
            <Route exact path="/postdata" element={<PostData />}></Route>
            <Route exact path="/getpostdata" element={<Getpostdata />}></Route>
            <Route exact path="/getpost" element={<Getpost />}></Route>
         </Route>
         <Route exact element={<PublicRoute/>}>
          <Route exact path="/" element={<Registration />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          </Route>

        </Routes>
      </BrowserRouter> 


    </div>
  );
}

export default App;
