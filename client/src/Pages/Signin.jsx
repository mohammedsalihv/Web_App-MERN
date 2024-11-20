import  { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { signInStart ,  signInSuccess , signInFailure } from "../redux/user/userSlice";
import {useDispatch, useSelector} from 'react-redux'
import OAuth from "../Components/OAuth";


  const SignIn = () => {

  const [formData, setFormData] = useState({});
  const {loading , error} = useSelector((state)=> state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
       dispatch(signInFailure(error))
       console.log(error);
       
    }
  };

  return (
    <div className="p-3 max-w-sm mx-auto">
      <h1 className="text-3xl text-center font-serif my-7 mt-8"> Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? error.message || "Something went wrong" : ''}</p>
    </div>
  );
};

export default SignIn;