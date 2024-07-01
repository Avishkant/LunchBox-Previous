import './App.css'
import LandingPage from './Components/Landing'
import Register from './Components/Register'
import Login from './Components/Login'
import { Routes, Route, Link } from 'react-router-dom';  

function App() {
    return (
       <div>
             <Routes>
                <Route exact path='/' element={<LandingPage/>}></Route>
                <Route exact path='/login' element={<Login/>}></Route>
                <Route exact path='/register' element={<Register/>}></Route>
             </Routes>



       </div>
  )
}

export default App
