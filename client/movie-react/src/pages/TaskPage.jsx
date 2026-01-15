import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/axiosInstance";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task/alltasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

 
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add or edit tasks");
      return;
    }

    try {
      if (editingId) {
        await axiosInstance.put(`/task/update/${editingId}`, { title, description });
        setEditingId(null);
      } else {
        await axiosInstance.post("/task/create", { title, description });
      }
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to delete tasks");
      return;
    }

    if (!window.confirm("Delete task?")) return;
    try {
      await axiosInstance.delete(`/task/delete/${id}`);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Tasks</h2>

        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{editingId ? "Edit Task" : "Add New Task"}</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <h4 className="text-lg font-semibold text-blue-700">{task.title}</h4>
              <p className="text-gray-700 mb-4">{task.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      alert("Please login to edit tasks");
                      return;
                    }
                    setEditingId(task._id);
                    setTitle(task.title);
                    setDescription(task.description || "");
                  }}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;



