import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, emailVerificaiton, addTodo, deleteTodo } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useState } from "react";
import { modal } from "../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr"

dayjs.extend(relativeTime);
dayjs.locale('tr')


export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [todo, setTodo] = useState("");
  const [done, setDone] = useState(true);
  const { todos } = useSelector((state) => state.todos);

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerificaiton();
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    await addTodo({
      todo,
      done,
      uid: user.uid,
    });
    setTodo("");
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  if (user) {
    return (
      <>
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="w-7 h-7 rounded-full" />
          )}
          Welcome, {user.displayName}
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Log out
          </button>
          <Link
            to="/settings"
            className="h-8 rounded px-4 text-sm text-white flex items-center bg-indigo-700"
          >
            Settings
          </Link>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
            >
              Email Verified
            </button>
          )}
        </h1>

        <form className="flex gap-x-4 mt-4" onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <label>
          <input type="checkbox" checked={done} onChange={e=> setDone(e.target.checked)} />
          Completed
          </label>
          <button
            disabled={!todo}
            className="inline-flex disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </form>

        <ul className="mt-4 flex flex-col gap-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 flex justify-between items-center rounded bg-indigo-50 text-sm text-indigo-700"
            >
              <span className={`${todo.done ? 'line-through' : ''}`}>
              {todo.todo}
              </span>
              {todo?.createdAt && <span>{dayjs.unix(todo.createdAt.seconds).fromNow()}</span>}
              <div className="flex gap-x-2">
              <button
                onClick={() => modal('edit-todo-modal', todo)}
                className="h-7 rounded px-3 text-xs bg-indigo-700 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="h-7 rounded px-3 text-xs bg-indigo-700 text-white"
              >
                Delete
              </button>
              </div>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="p-4 flex justify-between items-center rounded bg-orange-50 text-sm text-orange-700">You didn't add any Todo!</li>
          )}
        </ul>
      </>
    );
  }

  return (
    <div>
      <Link to="/register">Sign in</Link>
      <Link to="/login">Log in</Link>
    </div>
  );
}
