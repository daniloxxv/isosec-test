import React, {useContext} from 'react'
import {Context} from '../Wrapper'

function UserTable(){
    const {userList,sortUsers,getDetail,errorMessage} = useContext(Context)
    
    return (
            <table className='userList'>
                <thead>
                    <tr className='headerRow'>
                        <th className='idCell'>
                            <small className='hoverText'>Sort by</small><button className='tableButton' onClick={()=>sortUsers('Id')}>Id</button>
                        </th>
                        <th className='nameCell'>
                            <small className='hoverText'>Sort by</small><button className='tableButton' onClick={()=>sortUsers('First Name')}>First Name</button>
                        </th>
                        <th className='nameCell'>
                            <small className='hoverText'>Sort by</small><button className='tableButton' onClick={()=>sortUsers('Last Name')}>Last Name</button>
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