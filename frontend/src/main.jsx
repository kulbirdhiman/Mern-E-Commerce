
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/auth/Login.jsx';
import './index.css'
import Register from './pages/auth/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import {Route ,createRoutesFromElements ,RouterProvider} from 'react-router';
import {  createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import Profile from './pages/user/Profile.jsx'
import UserList from './pages/admin/UserList.jsx';
import AdminRoute from './pages/admin/AdminRoute.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path = '' element={<PrivateRoute/>} >
      <Route path='/profile' element={<Profile/>} />
    </Route>
     <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />


    <Route path='/admin' element={<AdminRoute/>} >
       <Route path='userlist'element={<UserList/>} />
    </Route>
  </Route>
  
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
    
  
)
