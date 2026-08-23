import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreatePostPage from './pages/CreatePostPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'


function App() {

  return (

  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/create' element={<CreatePostPage/>}/>
  </Routes>
  
  )
}

export default App
