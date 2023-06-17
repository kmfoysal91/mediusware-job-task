import React, { useEffect, useState } from "react";

const Problem1 = () => {
  
  // Required State 
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
    const [show, setShow] = useState("all");
    

//   Create Task
    const handleAddTask = (e) => {

    e.preventDefault();
    const newTask = { id: Date.now(), name, status };
    setTasks((prevItems) => [...prevItems, newTask]);
    setName("");
    setStatus("");    
        
  };

  useEffect(() => {
    setFilteredTasks(tasks); // Initialize filteredTasks with the original tasks array
  }, [tasks]);

    
    // Fiter and sorting task 
    const handleClick = (val) => {
      
      setShow(val);
      
    if (val === "active") {
      const activeTasks = tasks.filter(
        (task) => task.status.toLowerCase() === "active"
      );
      setFilteredTasks(activeTasks);
    } else if (val === "completed") {
      const completedTasks = tasks.filter(
        (task) => task.status.toLowerCase() === "completed"
      );
      setFilteredTasks(completedTasks);
    } else if (val === "all") {
      const sortedTasks = tasks.sort((a, b) => {
        if (a.status === "active" && b.status !== "active") return -1;
        if (a.status !== "active" && b.status === "active") return 1;
        if (a.status === "completed" && b.status !== "completed") return -1;
        if (a.status !== "completed" && b.status === "completed") return 1;
        return 0;
      });
      setFilteredTasks(sortedTasks);
    }
    };
    

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleAddTask}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks?.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>
                      <span
                        className={`rounded-pill px-3 py-1 ${
                          task.status.toLowerCase() === "active"
                            ? "bg-danger text-white"
                            : task.status.toLowerCase() === "completed"
                            ? "bg-info"
                            : "bg-warning"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
