import {BrowserRouter ,Routes,Route } from 'react-router-dom';

import About from './Pages/About';
import Signin from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Header from './components/header';
import PrivateRoutes from './components/PrivateRoutes';
import AddItem from './Pages/AddItem';
import ItemProfile from './Pages/ItemProfile';

import AllDetails from './Pages/AllDetails';
import UpdateItem from './Pages/UpdateItem';
import OnePetShow from './Pages/OnePetShow'






export default function App() {
  return <BrowserRouter>
<Header/>
  <Routes>
    <Route path="/" element={<AllDetails/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/sign-in" element={<Signin/>}></Route>
    <Route path="/additem" element={<AddItem/>}></Route>
    <Route path="/sign-up" element={<SignUp/>}></Route>
   
    <Route path="/onepet/:id" element={<OnePetShow/>}></Route>
 
    <Route element={<PrivateRoutes/>}>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/items" element={<ItemProfile/>}></Route>
    <Route path="/update-item/:id" element={<UpdateItem/>}></Route>


    </Route>
 
    
  </Routes>
  
  </BrowserRouter>
  
}
