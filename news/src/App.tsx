import {Routes, Route} from 'react-router-dom'
import { Login } from './pages/login'
import LayOut from './pages/LayOut'
import { Protect } from './components/protected'
import { NewList } from './components/newsList'
import { NewsDetails } from './components/newsDetail'
import { MixList } from './components/mixList'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Protect><LayOut /></Protect>}>
              <Route index element={<NewList />} />
              <Route path='article/:id' element={<NewsDetails />} />
              <Route path='mix-news' element={<MixList />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
