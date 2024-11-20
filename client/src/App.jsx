import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
