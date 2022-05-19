import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { deleteUser,listUsers} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';






export default function UserListScreen(props) {
  const [search,setSearch]=useState('');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, } = userList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const role =(user)=>{
  if (user.isSuperAdmin===true) {    
     return"super admin"}
     else if (user.isAdmin===true){
     return "admin"} 
     else {
     return "Dispatcher"}}    

   
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
   }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };

    


   
  return (
    <div>
      <div align="right">
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/user/register`)}> add User</button>
      </div>
      <br></br>
       <div className="row" >
        <input
          type="search"
          placeholder='search...'
          value={search}
             onChange={(e) => {
              setSearch(e.target.value.toLocaleLowerCase());
            }}
        ></input>
        </div>
       

      <h1>Users</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <table className="table">
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            {
            users.users.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase())).map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>        
                <td>{role(user)}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/user/${user._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
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
  )
}