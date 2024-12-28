import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormToDoList from "./components/FormToDoList";
import HomeWorkList from "./components/HomeWorkList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskEdit, setTaskEdit] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [viewTasks, setViewTasks] = useState(tasks);

  useEffect(() => {
    setViewTasks(tasks); // Inicializa las tareas visibles
  }, [tasks]);

  // Cargar tareas desde localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedCheckedTasks = localStorage.getItem("checkedTasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks)); // Parseo seguro
      } catch (error) {
        console.error("Error al parsear las tareas almacenadas", error);
      }
    }

    if (storedCheckedTasks) {
      try {
        setCheckedTasks(JSON.parse(storedCheckedTasks)); // Parseo seguro
      } catch (error) {
        console.error("Error al parsear los estados de las tareas", error);
      }
    }
  }, []);

  // Guardar tareas y estado de checkboxes en localStorage cuando cambien
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    if (checkedTasks.length) {
      localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
    }
  }, [tasks, checkedTasks]);

  // Agregar una nueva tarea
  const addTask = (task) => {
    if (task.trim()) {
      setTasks((prevTasks) => [{ id: Date.now(), task }, ...prevTasks]);

      Swal.fire({
        icon: "success",
        title: "Tarea agregada",
        text: "La tarea fue añadida correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Editar una tarea
  const handleEdit = (id, newTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, task: newTask } : task
    );
    setTasks(updatedTasks);
    setTaskEdit(null);

    Swal.fire({
      icon: "success",
      title: "Editada",
      text: "La tarea fue editada correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Iniciar la edición de una tarea
  const startEditing = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskEdit(taskToEdit); // Ahora contiene el objeto completo
  };

  // Eliminar una tarea
  const handleQuit = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);

        Swal.fire({
          icon: "success",
          title: "Eliminada",
          text: "La tarea ha sido eliminada.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  // Manejar el cambio de estado del checkbox
  const handleCheckboxChange = (taskId) => {
    setCheckedTasks((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  const handleCompleted = () => {
    const taskCompleted = tasks.filter((task) =>
      checkedTasks.includes(task.id)
    );
    setViewTasks(taskCompleted);
  };

  const handleShowAll = () => {
    setViewTasks(tasks);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[90%] sm:w-[600px] bg-white p-4 rounded-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center">Listado de Tareas</h1>
          <FormToDoList
            addTask={addTask}
            taskEdit={taskEdit}
            editTask={(newTask) => handleEdit(taskEdit.id, newTask)}
          />
          {tasks.length === 0 ? (
            <p className="text-xl">Agrega alguna tarea.</p>
          ) : (
            <div className="w-[98%] m-auto">
              <HomeWorkList
                tasks={viewTasks}
                checkedTasks={checkedTasks}
                handleEdit={startEditing}
                handleQuit={handleQuit}
                handleCheckboxChange={handleCheckboxChange}
              />
              <div className="flex flex-col gap-y-4 sm:flex-row justify-between items-center">
                <p className="text-xl text-slate-700 font-bold">
                  Tareas pendientes:{" "}
                  {
                    tasks.filter((task) => !checkedTasks.includes(task.id))
                      .length
                  }
                </p>

                <div>
                  <ul className="flex gap-x-3">
                    <li
                      onClick={handleShowAll}
                      className="py-2 px-3 border-2 border-slate-800 rounded-full font-bold cursor-pointer hover:bg-slate-800 hover:text-white"
                    >
                      Mostrar Todo
                    </li>
                    <li
                      onClick={handleCompleted}
                      className="py-2 px-3 border-2 border-slate-800 rounded-full font-bold cursor-pointer hover:bg-slate-800 hover:text-white"
                    >
                      Completadas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
