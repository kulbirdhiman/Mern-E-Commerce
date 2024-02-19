import {useSelector} from 'react-redux'
import {Navigate ,Outlet} from 'react-router-dom'
const PrivateRoute = ()=>{
    const userinfo = useSelector(state => state.auth)
    return userinfo ? <Outlet/>  : <Navigate to="/login"/>
}
export default PrivateRoute