import { useState } from 'react'
import './Navigation.css'
import {AiOutlineHome ,AiOutlineUserAdd,AiOutlineShoppingCart,AiOutlineShopping, AiOutlineLogin} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import {useLoginMutation} from '../../redux/api/userApiSlice'
import { logout } from '../../redux/features/authSlice'
 const Navigition = () => {
  const {userinfo} = useSelector(state => state.auth)
    const [dropDown ,setDropDown] = useState(false)
    const [sideBar, setSideBar] = useState(false)

    const toggleDropDown = ()=>{
      setDropDown(!dropDown)
    }
    const ToggleSideBar = ()=>{
      setSideBar(!sideBar)
    }
    const closeSideBar = ()=>{
      setSideBar(close)
    }
    const dispacth = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLoginMutation()

    const logoutHandler =async ()=>{
        try {
          await  logoutApiCall().unwrap()
          dispacth(logout)
          navigate("/login")
        } catch (error) {
          console.log(error)
        }
    }

  return (
  <div
      style={{ zIndex: 9999 }}
      className={`${
        sideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>


        </Link>
        <Link to="/favorite" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">favorite</span>{" "}
          </div>
        </Link>
      </div>
      <div className='relative' >
        <button onClick={toggleDropDown} className='flex items-center text-grey-8000 focus:outline-none'>
          {userinfo ? <span className='text-white' >{userinfo.username} </span> :(<></>)}
        </button>
      </div>
      <ul>
        <li>
           <Link to="/login" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineLogin className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
          </div>
        </Link>
        </li>
        <li>
           <Link to="/register" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineUserAdd className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Reginster</span>{" "}
          </div>
        </Link>
        </li>
      </ul>

      </div>
      )
}
export default Navigition