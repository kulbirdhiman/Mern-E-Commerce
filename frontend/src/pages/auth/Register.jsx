import {Link, useLocation,useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {setCreadionls} from '../../redux/features/authSlice';
import {toast} from 'react-toastify'
import {useRegisterMutation} from '../../redux/api/userApiSlice'
import { useEffect, useState } from 'react';
const Register = () => {
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [confrimPassword , setConfrimPassword] = useState('')
    const dispacth = useDispatch()
    const navigate = useNavigate()

    const [register ,{isLoading}] = useRegisterMutation()
    const {userinfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new  URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'
    useEffect(()=>{
        if(userinfo){
            navigate(redirect)
        }
    },[navigate , userinfo , redirect])

    const submitHandler = async(e)=>{
        e.preventDefault()
    if(password !== confrimPassword){
        toast("Passwords do not match",{type:"error"})
    }else{
        try {
            let res = await register({userName,email,password}).unwrap()
            console.log(res)
            dispacth(setCreadionls({...res}))
            navigate("/")
            toast("you are registerd")
        } catch (error) {
            console.log(error)
        }
    }
    }
    
  return (
      <section className="pl-[10rem] flex flex-wrap" >
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">
          SignUp
        </h1>
        <form onSubmit={submitHandler} className="w-[40rem] container ">
             <div className="my-[2rem]">
            <label htmlFor="email" className="font-medium text-sm block">User Name</label>
            <input
              type="text"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

          </div>
         
          <div className="my-[2rem]">
            <label htmlFor="email" className="font-medium text-sm block">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>
          <div className="my-[2rem]">
            <label htmlFor="Password" className="font-medium text-sm block">Password</label>
            <input
              type="Password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="Password" className="font-medium text-sm block">Password</label>
            <input
              type="Password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={confrimPassword}
              onChange={(e) => setConfrimPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Register In..." : "signUp"}
          </button>
          {isLoading && "loading...."}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Already have account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  
  )
}
export default Register