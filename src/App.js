import{React} from 'react'
import'./styles.css'
import Home from './home'
import { Err404 } from './Err404'
import { Login } from './login'
import Dashbord from './dashbord'
import { Watch } from './watch'
import { Toprated } from './toprated'
import { History } from './history'
import Profile from './profile'
import { About } from './About'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className='home'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Dashbord/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/watch=:id' element={<Watch/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path="/toprated" element={<Toprated/>}></Route>
        <Route path='*' element={<Err404/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
  ;
}

export default App;
