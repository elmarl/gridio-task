import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logout } from "../app/store";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-black">Dashboard</h1>
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="truncate hidden sm:inline">
          Logged in as: {user?.username}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
