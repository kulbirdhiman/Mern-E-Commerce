import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCreadionls } from '../../redux/features/authSlice';
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispacth = useDispatch()

  const [login, {isLoading}] = useLoginMutation()
  const { userinfo } = useSelector(state => state.auth)

  const { search } = useLocation();
    const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";


  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userinfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res =  await login({ email, password }).unwrap();
      console.log(res)
      dispacth(setCreadionls({...res}))
      navigate(redirect)
    } catch (err) {
       toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <section className="pl-[10rem] flex flex-wrap" >
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">
          SignIn
        </h1>
        <form onSubmit={submitHandler} className="w-[40rem] container ">
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
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading && "loading...."}
        </form>
        <div className="mt-4">
          <p className="text-white">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
export default Login