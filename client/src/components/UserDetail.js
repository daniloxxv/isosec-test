import React from 'react'

function UserDetail(props){
    const {user,setDisplayDetail, errorMessage} = props
    return (!errorMessage ?
            <table className='userCard'>
                <thead>
                    <tr>
                        <th className='username'>
                            {user.name}
                        </th>
                        <th className='userpicture'>
                            <img src={user.picture}alt={user.name}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>
                            <strong>Gender: </strong>{user.gender}
                        </td>
                        <td>
                            <strong>Age: </strong>{user.age}
                        </td>
                    </tr>
                    <tr >
                        <td>
                            <strong>Email: </strong>{user.email}
                        </td>
                        <td>
                            <strong>Phone: </strong>{user.phone}
                        </td>
                    </tr>

                    <tr >
                        <td>
                            <strong>Address: </strong>{user.address}
                        </td>
                        <td>
                            <strong>Registered: </strong>{user.registered}
                        </td>
                    </tr>
                    <tr>
                        <td className='userfriends'>
                            <strong>Friends: </strong>{user.friends.map(el=>el.name).join(", ")}
                        </td>
                        <td>
                            <button onClick={()=>setDisplayDetail(false)}>Return to table</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            :
            <table>
                <thead>
                    <tr>
                        <th>
                          {errorMessage}
                        </th>
                    </tr>
                </thead>
            </table>
    )
}


export default UserDetail