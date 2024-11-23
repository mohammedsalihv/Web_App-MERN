import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

import AdminAddUser from "./Pages/AdminAddUser";
import AdminEditUser from "./Pages/AdminEditUser";
import AdminHeader from "./Components/AdminHeader";
import AdminHome from "./Pages/AdminHome";
import AdminUsers from "./Pages/AdminUsers";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import AdminSignin from "./Pages/AdminSignin";
import Error from "./Pages/Error";

const App = () => {
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <BrowserRouter>
      {isAdmin ? <AdminHeader /> : <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/sign-in" element={<AdminSignin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/add-user" element={<AdminAddUser />} />
        <Route path="/admin/edit-user/:id" element={<AdminEditUser />} />
        
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/home" element={<AdminHome />} />
        </Route>

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
