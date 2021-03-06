import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteSystem,listSystems } from '../actions/systemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SYSTEM_DETAILS_RESET } from '../constants/systemConstants';



export default function SystemListScreen(props) {
  const [search,setSearch]=useState('');
  const systemList = useSelector((state) => state.systemList);
  const { loading, error, systems } = systemList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const systemDelete = useSelector((state) => state.systemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = systemDelete;


   
  useEffect(() => {
    
    dispatch(listSystems());
    dispatch({
      type: SYSTEM_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);


   const deleteHandler = (system) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSystem(system._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/system/CreateSystem`)}> create system</button>

        <div className="row" >
        <input
          type="search"
          placeholder='search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        </div>

      <h1>Systems</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">System Deleted Successfully</MessageBox>
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
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
           
            { systems.system.filter((system) => {
            if (search === "") {
              return system;
            } else if (
              system.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return system;
            };
            
          }).map((system) => (
              <tr key={system._id}>
                <td>{system.name}</td>
                <td>{system.description}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/system/${system._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(system)}
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