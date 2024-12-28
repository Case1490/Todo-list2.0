const HomeWorkList = ({
  tasks,
  checkedTasks,
  handleEdit,
  handleQuit,
  handleCheckboxChange,
}) => {
  return (
    <div className="w-full">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex bg-slate-300 items-center justify-between my-4 p-2 rounded-lg gap-x-4"
        >
          <div>
            <input
              type="checkbox"
              checked={checkedTasks.includes(task.id)}
              onChange={() => handleCheckboxChange(task.id)}
            />
          </div>

          <p
            className={`flex-1 ${
              checkedTasks.includes(task.id) ? "line-through text-gray-500" : ""
            }`}
          >
            {task.task}
          </p>

          <div className=" gap-x-2 flex">
            <button onClick={() => handleEdit(task.id)}>✏️</button>
            <button onClick={() => handleQuit(task.id)}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeWorkList;
