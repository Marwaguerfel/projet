import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteComponents,listComponents } from '../actions/componentsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { COMPONENTS_DETAILS_RESET } from '../constants/componentsConstants';




export default function ComponentListScreen(props) {
  const componentsList = useSelector((state) => state.componentsList);
  const { loading, error, components } = componentsList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const componentsDelete = useSelector((state) => state.componentsDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = componentsDelete;


   
  useEffect(() => {
       dispatch(listComponents());

    dispatch({
      type: COMPONENTS_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);

   useEffect(()=>{
     console.log(components);
   })

   const deleteHandler = (component) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteComponents(component._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/components/CreateComponents`)}> create component</button>
      <h1>task State</h1>
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
              <th>TASK THEME REF</th>
              <th>TASK MODEL REF</th>

              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            
            {components.components.length >0 &&
             components.components.map((component) => (
              <tr key={component._id}>
                <td>{component.name}</td>
                <td>{component.description}</td>
                <td>{component.taskTheme.name}</td>
                <td>{component.taskModel.name}</td>

                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/component/${component._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(component)}
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