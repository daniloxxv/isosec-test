import React from 'react'

function UserTable(props){
    const {userList,getDetail,sortUsers, errorMessage} = props

    return (
            <table className='userList'>
                <thead>
                    <tr className='headerRow'>
                        <th className='idCell'>
                            <a onClick={()=>sortUsers('Id')}>Id</a>
                        </th>
                        <th className='nameCell'>
                            <a onClick={()=>sortUsers('First Name')}>First Name</a>
                        </th>
                        <th className='nameCell'>
                            <a onClick={()=>sortUsers('Last Name')}>Last Name</a>
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