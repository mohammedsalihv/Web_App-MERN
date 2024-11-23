import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // Get user info from Redux store

  return (
    <div className='bg-purple-600 text-white'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold uppercase'>Auth App</h1>
        </Link>
        <ul className='flex gap-4 uppercase'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to={currentUser ? '/profile' : '/sign-in'}>
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt='profile'
                  className='h-7 w-7 rounded-full object-cover'
                />
              ) : (
                'SignIn'
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
