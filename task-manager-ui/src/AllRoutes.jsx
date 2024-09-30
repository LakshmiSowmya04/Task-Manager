import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'
import { Routes,Route } from 'react-router-dom'
const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} ></Route>
            <Route path='/Auth' element={<Auth/>}></Route>
        </Routes>

    </div>
  )
}

export default AllRoutes