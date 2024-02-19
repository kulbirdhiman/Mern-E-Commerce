import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import { setCreadionls } from '../../redux/features/authSlice';
import {useProfileMutation} from '../../redux/api/userApiSlice'
import { useEffect ,useState} from 'react';
 const Profile = () => {
    const {userinfo} = useSelector(state => state.auth)
    const [updateProfile ,{isLoading}] = useProfileMutation()
     const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [confrimPassword , setConfrimPassword] = useState('')
    const dispacth = useDispatch()
    
    useEffect(()=>{
        setUserName(userinfo.userName)
        setEmail(userinfo.email)
    },[userinfo.userName ,userinfo.email])
    const submitHandler = async(e)=>{
        e.preventDefault();
         if (password !== confrimPassword) {
      toast.error("Passwords do not match");
    } else{
        try {
      const res = await  updateProfile({
        _id :userinfo._id,
        userName,
        email ,
         password
      }).unwrap()
      dispacth(setCreadionls({...res}))
      toast.success("Profile updated successfully");
        } catch (err) {
            console.log(err)
             toast.error(err?.data?.message || err.error);
        }
    }
    }
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full"
                value={confrimPassword}
                onChange={(e) => setConfrimPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
            {isLoading && "loadin..."}
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Profile