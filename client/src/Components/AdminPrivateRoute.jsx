import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const AdminPrivateRoute = () => {
  const { currentUser } = useSelector(state => state.user);
  // Check if the user is logged in and if they are an admin
  if (currentUser && currentUser.isAdmin) {
   // Render the child components inside <Outlet> for authenticated admin users
   return <Outlet />;
 } else {
   // Redirect to the admin sign-in page if the user is not an admin or not logged in
   return <Navigate to='/admin/signin' />;
 }
}

export default AdminPrivateRoute
