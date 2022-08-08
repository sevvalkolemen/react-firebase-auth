import { useState } from "react";
import { updateTodo } from "../../firebase";

export default function EditTodoModal({ close, data }) {
  const [todo, setTodo] = useState(data.todo);
  const [done, setDone] = useState(data.done);

  const clickHandle = async () => {
    await updateTodo(data.id, {
      todo,
      done
    });
    close();
  };
  return (
    <div className="mt-1">
      <input
        type="text"
        value={todo}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        onChange={(e) => setTodo(e.target.value)}
      />
       <label>
       <input
        type="checkbox"
        checked={done}
        onChange={(e) => setDone(e.target.checked)}
      />
        Mark as Complete
       </label>
      <br />
      <button
        onClick={clickHandle}
        className="inline-flex  disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  );
}
