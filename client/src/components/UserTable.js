import React from 'react'

function UserTable(props){
    const {userList,getDetail,sortUsers} = props

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
                    {userList.length ? userList.map(el=>{
                    return (
                    <tr key={el._id} className='userRow'>
                        <a onClick={()=>getDetail(el._id)} className='userRow'>
                            <td className='idCell'>
                                {el.index}
                            </td>
                            <td className='nameCell'>
                                {el.name.replace(/\w+$/g,"")}
                            </td>
                            <td className='nameCell'>
                                {el.name.replace(/^\w+/g,"")}
                            </td> 
                        </a>                       
                    </tr>)
                
                }) : <tr className='userRow'>
                        <td className='noUsers'>
                            No users found
                        </td>
                    </tr>}
                </tbody>
            </table>
        )
}

export default UserTable