import React from 'react'
import axios from 'axios';
import {serverUrl} from '../config'

function UserTable({userList,setUserDetail,setUserList,setDisplayDetail,setErrorMessage,errorMessage}){

    const sortUsers = term => {
        const sortedList = [...userList].sort((a,b)=>{
        switch (term){
          case 'First Name':
            return a.name.replace(/\w+$/g,"").localeCompare(b.name.replace(/\w+$/g,""))
          case 'Last Name':
            return a.name.replace(/^\w+/g,"").localeCompare(b.name.replace(/^\w+/g,""))
          case 'Id':
            return a.index - b.index
          default:
            return 0
        }
      })
      setUserList(sortedList)
    }
    
    const getDetail = id => {
        axios.get(`${serverUrl}/users/${id}/information`)
        .then(user=>{
            setErrorMessage('')
            setUserDetail(user.data)
            setDisplayDetail(true)
        })
        .catch(err=>setErrorMessage('The server was unable to process request; please try again later'))
    }


    return (
            <table className='userList'>
                <thead>
                    <tr className='headerRow'>
                        <th className='idCell'>
                            <button className='tableButton' onClick={()=>sortUsers('Id')}>Id</button>
                        </th>
                        <th className='nameCell'>
                            <button className='tableButton' onClick={()=>sortUsers('First Name')}>First Name</button>
                        </th>
                        <th className='nameCell'>
                            <button className='tableButton' onClick={()=>sortUsers('Last Name')}>Last Name</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {errorMessage ? 
                    <tr className='userRow'>
                    <td className='idCell'>
                            
                        </td>
                        <td className='nameCell'>
                            {errorMessage}
                        </td>
                        <td className='nameCell'>
                            
                        </td> 
                </tr>
                    :    
                    userList.length ? userList.map(el=>{
                    return (
                    <tr key={el._id} onClick={()=>getDetail(el._id)} className='userRow'>
                            <td className='idCell'>
                                {el.index}
                            </td>
                            <td className='nameCell'>
                                {el.name.replace(/\w+$/g,"")}
                            </td>
                            <td className='nameCell'>
                                {el.name.replace(/^\w+/g,"")}
                            </td> 
                    </tr>)
                
                }) : <tr className='userRow'>
                        <td className='idCell'>
                                No users found
                            </td>
                            <td className='nameCell'>
                                -
                            </td>
                            <td className='nameCell'>
                                -
                            </td> 
                    </tr>}
                </tbody>
            </table>
        )
}

export default UserTable