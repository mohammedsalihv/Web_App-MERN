import { useState  } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddUser = () => {


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const newUser = { username, email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("User added", data);

        setUsername("");
        setEmail("");
        setPassword("");
        navigate('/admin/users')
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden mt-10 p-6 ">
        <h2 className="text-3xl text-center font-bold my-7 text-blue-900">
          ADD NEW USER
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-slate-300 p-3 rounded-md w-full"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-300 p-3 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-300 p-3 rounded-md w-full"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-2 uppercase hover:opacity-95 disabled:opacity-80 mt-4 w-full"
          >
            ADD NEW USER
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddUser;
