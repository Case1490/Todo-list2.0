import { useEffect, useState } from "react";

const FormToDoList = ({ addTask, taskEdit, editTask }) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    // Si taskEdit contiene una tarea, establece el valor en el estado 'task'
    if (taskEdit) {
      setTask(taskEdit.task); // Ahora 'taskEdit' contiene todo el objeto
    } else {
      setTask(""); // Si no hay tarea en edición, se limpia el campo
    }
  }, [taskEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim()) {
      if (taskEdit) {
        editTask(task);
      } else {
        addTask(task);
      }
      setTask(""); // Limpia el campo después de agregar o editar
    }
  };

  return (
    <div className=" my-4 w-full">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="text"
          placeholder="Añadir tarea"
          className="p-4 bg-gray-200 placeholder:text-gray-800 rounded-l-lg outline-none w-[90%]"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          type="submit"
          className="px-4 bg-slate-900 text-white block  rounded-r-lg text-xl"
        >
          {taskEdit ? "Guardar" : "+"}
        </button>
      </form>
    </div>
  );
};

export default FormToDoList;
