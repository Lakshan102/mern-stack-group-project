import Navbar from './components/navbar/navbar.jsx'

import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/add.jsx'

import Orders from './pages/Orders/orders.jsx'

import AddIngredients from './pages/addIngredients/addIngredients.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url} />}/>
          <Route path='/list' element={<List url={url} />}/>
          <Route path='/orders' element={<Orders url={url} />}/>
          <Route path='/new' element={<NewFood url={url}/>}/>
          <Route path='/add-ingredients' element={<AddIngredients url={url} />}/>
          <Route path='/list-ingredients' element={<ListIngredients url={url} />}/>

        </Routes>
      </div>
    </div>
  )
}

export default App
