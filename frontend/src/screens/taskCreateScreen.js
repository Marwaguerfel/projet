import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {listTaskModels} from '../actions/taskModelActions';
import {listTaskThemes} from '../actions/taskThemeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';
import {TASKMODEL_DETAILS_RESET} from '../constants/taskModelConstants'
import {TASKTHEME_DETAILS_RESET} from '../constants/taskThemeConstants'

import { CreateComponenets } from '../actions/componentsActions';
//na9sa select option mt3 task theme

export default function ComponentsCreateScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [taskTheme,setTaskTheme]= useState('');
  const [taskModel,setTaskModel]= useState('');
   const [startDate, setStartDate] = useState('');
  const [endDate,setEndDate ] = useState('');
  const taskThemeList = useSelector((state) => state.taskThemeList);
  const { taskThemes } = taskThemeList;
  const taskModelList = useSelector((state) => state.taskModelList);
  const { taskModels } = taskModelList;
  const navigate=useNavigate();
  const  componentsCreate= useSelector((state) => state.componentsCreate);
  const { components,loading, error } = componentsCreate;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(CreateComponenets(name, description,taskTheme,taskModel));
  };
    useEffect(() => {
       dispatch(listTaskModels());
        dispatch({
      type: TASKMODEL_DETAILS_RESET,

    });
    
    dispatch(listTaskThemes());
    dispatch({
  type: TASKTHEME_DETAILS_RESET,})
    
   }, [dispatch]);
  
  useEffect(() => {
    if (components) {
      navigate('/componentsList')
    }
  },[navigate,taskModel,components,taskTheme]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Component </h1>
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
          <label htmlFor=''>task Theme Ref</label>
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
         <button className="primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
  };