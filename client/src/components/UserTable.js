import React from 'react'

function UserTable(props){
    const {userList,getDetail} = props

    return (
        <section className='userlist'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length ? userList.map((el,i)=>{
                    return (
                    <tr key={i}>
                        <td onClick={()=>getDetail(el._id)}>
                            {el.index}
                        </td>
                        <td>
                            {el.name.replace(/\w+$/g,"")}
                        </td>
                        <td>
                            {el.name.replace(/^\w+/g,"")}
                        </td>                        
                    </tr>)
                
                }) : <tr><td>No users found</td></tr>}
                </tbody>
            </table>
        </section>
        )
}

export default UserTable