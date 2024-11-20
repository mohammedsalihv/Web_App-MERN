import Logo from '../../public/1657952641google-logo-png-image.webp';
import {GoogleAuthProvider , signInWithPopup , getAuth} from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';


const OAuth = () => {

    const dispatch = useDispatch()
    const handleGoogleClick = async () =>{

        try {
              const provider = new GoogleAuthProvider()
              const auth = getAuth(app)
              const result = await signInWithPopup(auth , provider) 
     
              const res = await fetch('/api/auth/google',{
                 method : 'POST',
                 headers : {
                    "Content-Type" : "application/json"
                 },
                 body: JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL

                 }),
              })
              const data = await res.json()
              console.log(data);
              
              dispatch(signInSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <button type='button' onClick={handleGoogleClick} className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
      <img src={Logo} alt="Google Logo" className="inline-block w-7 h-7 mr-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;
