import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup'
import './user.css'

function Users() {
    const [ userData, setUserData ] = useState({})
    const [ individual, setIndividualData ] = useState({})
    const [ modal, modalStatus ] = useState(false)

    useEffect(() => {
        axios.get('https://ankit-users.herokuapp.com/users')
        .then((result) => {
            console.log("da",result)
            setUserData(result.data)
        })
        .catch(function (error) {
          console.log(error);
        }) 
      },[]);

    function showUserData(user){
        setIndividualData(user)
        modalStatus(true)
    }

    function closePopup(){
        modalStatus(false)
    }

    return(
        <React.Fragment>
            <h1 className='header'>List of users</h1>
            <table id="customers" className='customers'>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                </tr>
                {userData && userData.members && userData.members.map((data,index) => {
                    return(
                        <tr>
                            <td><button className='userDataButton' onClick={()=>showUserData(data)} >{data.id}</button></td>
                            <td><button className='userDataButton' onClick={()=>showUserData(data)} >{data.real_name}</button></td>
                        </tr>
                    )
                })}
            </table>
            {modal && <Popup individual={individual} closePopup={() => closePopup()}  />}
        </React.Fragment>
    )
}

export default Users