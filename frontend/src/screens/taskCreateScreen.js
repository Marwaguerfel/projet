import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {listTaskModels} from '../actions/taskModelActions';
import {listTaskThemes} from '../actions/taskThemeActions';
import {listWeeks} from '../actions/weekActions';
import {CreateTask} from '../actions/taskActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';
import {TASKMODEL_DETAILS_RESET} from '../constants/taskModelConstants'
import {USER_DETAILS_RESET} from '../constants/userConstants'
import {WEEK_DETAILS_RESET} from '../constants/weekConstants'
import {TASKTHEME_DETAILS_RESET} from '../constants/taskThemeConstants'
import { listUsers } from '../actions/userActions';
import { listTaskStates } from '../actions/taskStateActions';
import { TASKSTATE_DETAILS_RESET } from '../constants/taskStateConstants';
import { listComponents } from '../actions/componentsActions';

//na9sa select option mt3 task theme

export default function TaskCreateScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [taskTheme,setTaskTheme]= useState('');
  const [taskModel,setTaskModel]= useState('');
  const [component,setComponent]= useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [week,setWeek] = useState('');
  const [user,setUser] = useState('');
  const [system,setSystem] = useState('');
  const [taskState,setTaskState] = useState('');
   const taskStateList = useSelector((state) => state.taskStateList);
  const { taskStates } = taskStateList;
  const userList = useSelector((state) => state.userList);
  const { users} = userList;
  const weekList = useSelector((state) => state.weekList);
  const { weeks } = weekList;
  const taskThemeList = useSelector((state) => state.taskThemeList);
  const { taskThemes } = taskThemeList;
  const taskModelList = useSelector((state) => state.taskModelList);
  const { taskModels } = taskModelList;
  const  componentsList= useSelector((state) => state.componentsList);
  const { components } = componentsList;
    const  taskCreate= useSelector((state) => state.taskCreate);
  const { task,loading, error } = taskCreate;
  
  
  const navigate=useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(CreateTask(name,
      description,
      taskTheme,
      taskModel,
      component,
      week,
      startDate,
      endDate,
      user,
      taskState,
    ));
  };
    useEffect(() => {

      dispatch(listUsers());
        dispatch({
      type: USER_DETAILS_RESET,

    });
    
    dispatch(listTaskStates());
        dispatch({
      type: TASKSTATE_DETAILS_RESET,

    });
    dispatch(listWeeks());
        dispatch({
      type: WEEK_DETAILS_RESET,

    });
      dispatch(listComponents());
        dispatch({
      type: TASKMODEL_DETAILS_RESET,

    });
    

       dispatch(listTaskModels());
        dispatch({
      type: TASKMODEL_DETAILS_RESET,
    });
    
    dispatch(listTaskThemes());
    dispatch({
  type: TASKTHEME_DETAILS_RESET,})
    
   }, [dispatch]);
  
  useEffect(() => {
    if (task) {
      navigate('/tasksList')
    }
  },[navigate,taskModel,components,taskTheme,user,weeks,taskState,task]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create task </h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        
        <div>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="Name"
            placeholder="Enter  name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label htmlFor="description">description</label>
          <input
            type="text"
            id="Description"
            placeholder="Enter Description"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

         <div>
          <label htmlFor=''>Week Ref</label>
          <select 
            onChange={(e) => {setWeek(e.target.value)
            console.log("hello",e.target)
            console.log(weeks)}
          }
          
          > 
                  
            { weeks?.weeks?.map((week)=>
            
            <option  
            value={week._id}
            key ={week._id}
            >{week.name}</option>
            )}
            <option defaultValue >chose...</option>
          </select>

        </div>
        <div>
          <label htmlFor='weekRef'>user Ref</label>
          <select 
            onChange={(e) => {setUser(e.target.value)
            console.log("hello",e.target)
            console.log(users)}
          }
          
          > 
                  
            { users?.users?.map((user)=>
            
            <option  
            value={user._id}
            key ={user._id}
            >{user.firstName}</option>
            )}
            <option defaultValue >chose...</option>
          </select>

        </div>



        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            placeholder="Enter Start Date"
            value={startDate}
            onChange={(e) => {
              console.log(e.target.value);
              setStartDate(e.target.value)
            }}
          ></input>
        </div>

        <div>
          <label htmlFor="endDate">end Date</label>
          <input
            id="endDate"
            type="date"
            placeholder="Enter end Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </div>


        <div>
          <label htmlFor='taskThemeRef'>task Theme Ref</label>
          <select 
            onChange={(e) => {setTaskTheme(e.target.value)
            console.log("hello",e.target)
            console.log(taskThemes)}
          }
          
          > 
                  
            { taskThemes?.taskThemes?.map((taskTheme)=>
            
            <option  
            value={taskTheme._id}
            key ={taskTheme._id}
            >{taskTheme.name}</option>
            )}
            <option defaultValue >chose...</option>
          </select>

        </div>

            <div>
              <label htmlFor='taskModelRef'>task Model Ref</label>
              <select 
                onChange={(e) => {setTaskModel(e.target.value)
                console.log("hello",e.target)
                console.log(taskModels)}
              }
              
              > 
                      
                { taskModels?.taskModels?.map((taskModel)=>
                              
                <option  
                value={taskModel._id}
                key ={taskModel._id}
                >{taskModel.name}</option>
                )}
                <option defaultValue >chose...</option>
              </select>
    
            </div>


        <div>
          <label htmlFor='componentsRef'>components Ref</label>
          <select 
            onChange={(e) => {setComponent(e.target.value)
            console.log("hello",e.target)
            console.log(components)}
          }
          
          > 
                  
            { components?.components?.map((component)=>
                          
            <option  
            value={component._id}
            key ={component._id}
            >{component.name}</option>
            )}
            <option defaultValue >chose...</option>
          </select>

         </div>
           
         
          <div>
          <label htmlFor='stateRef'>task State Ref</label>
          <select 
            onChange={(e) => {setTaskState(e.target.value)
            console.log("hello",e.target)
            console.log(taskStates)}
          }
          
          > 
                  
            { taskStates?.taskStates?.map((taskS)=>
            
            <option  
            value={taskS._id}
            key ={taskS._id}
            >{taskS.name}</option>
            )}
            <option defaultValue >chose...</option>
          </select>

        </div>

         
        <div>
         <button className="primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
  };