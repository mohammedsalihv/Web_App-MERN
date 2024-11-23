import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userManagement.js';

const AdminHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = useSelector((state) => state.user?.currentUser);
    const userCount = useSelector((state) => state.userManagement?.totalUser ?? 0);

    const handleLogout = () => {
        dispatch(signOut());
        localStorage.removeItem('authToken');
        navigate('/admin/sign-in');
    };

    // Do not render header on admin sign-in page
    if (location.pathname === '/admin/sign-in') {
        return null;
    }

    // Render nothing if the admin is not logged in
    if (!currentUser?.isAdmin) {
        return null;
    }

    return (
        <div className='bg-slate-600 text-white'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                {/* Dashboard Link */}
                <Link to='/admin/home'>
                    <h1 className='font-bold uppercase text-lg'>Dashboard</h1>
                </Link>

                {/* User Count and Logout */}
                <div className='flex items-center gap-6 uppercase'>
                    {/* Users Link */}
                    <Link to='/admin/users' className='text-sm hover:underline font-bold'>
                        Users list
                    </Link>

                    {/* User Count */}
                    <div className='text-sm'>
                        <span className='font-bold'>Total users :</span> {userCount}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className='bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200'
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
