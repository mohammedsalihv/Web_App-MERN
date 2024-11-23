import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userManagement.js";

const AdminEditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/admin/user/${id}`);
        const data = await res.json();
        console.log("Fetched user data:", data);  // Log the response data
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);  // Set loading to false after the fetch attempt
      }
    };
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`/api/admin/edit-user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser = await res.json();
      dispatch(updateUserSuccess(updatedUser));
      navigate("/admin/users");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Loading spinner or text while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white shadow-lg  overflow-hidden mt-10 w-50">
        <h1 className="text-2xl font-bold text-center py-4 bg-slate-700 text-white">
          Edit User
        </h1>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={userData.username}
              className="bg-gray-200 px-3 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={userData.email}
              className="bg-gray-200 px-3 py-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              onChange={handleChange}
              value={userData.profilePicture}
              className="bg-gray-200 px-3 py-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white px-4 py-1  hover:bg-slate-700 transition duration-200"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUser;
