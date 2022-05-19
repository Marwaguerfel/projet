import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTask,listTask } from '../actions/taskActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {TASK_DETAILS_RESET } from '../constants/taskConstants';




export default function TaskListScreen(props) {
  const taskList = useSelector((state) => state.taskList);
  const { loading, error, task } = taskList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;


   
  useEffect(() => {
       dispatch(listTask());

    dispatch({
      type: TASK_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);

   useEffect(()=>{
     console.log(task);
   })

   const deleteHandler = (task) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteTask(task._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/tasks/CreateTask`)}> create Task</button>
      <h1>task </h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">component Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>TASK THEME </th>
              <th>TASK MODEL </th>
              <th>WEEK</th>
              <th>START DATE</th>  
              <th>END DATE</th>  
              <th>SYSTEM</th>
              <th>USER</th>  
              <th>STATUS</th>  
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            
            {task.task.length >0 &&
             task.task.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.taskTheme.name}</td>
                <td>{task.taskModel.name}</td>
                <td>{task.week.name}</td>
                <td>{task.user.firstName}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.taskState}</td>
                <td>
                 <button                
                    type="button"
                    className="small"
                    onClick={() => navigate(`/task/${task._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}