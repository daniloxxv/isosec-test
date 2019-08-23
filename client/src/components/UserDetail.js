import React, {useContext} from 'react'
import {Context} from '../Wrapper'

function UserDetail(){
    const {userDetail,setDisplayDetail, errorMessage} = useContext(Context)
    
    return (!errorMessage ?
            <table className='userCard'>
                <thead>
                    <tr>
                        <th className='username'>
                            {userDetail.name}
                        </th>
                        <th className='userpicture'>
                            <img src={userDetail.picture}alt={userDetail.name}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>
                            <strong>Gender: </strong>{userDetail.gender}
                        </td>
                        <td>
                            <strong>Age: </strong>{userDetail.age}
                        </td>
                    </tr>
                    <tr >
                        <td>
                            <strong>Email: </strong>{userDetail.email}
                        </td>
                        <td>
                            <strong>Phone: </strong>{userDetail.phone}
                        </td>
                    </tr>

                    <tr >
                        <td>
                            <strong>Address: </strong>{userDetail.address}
                        </td>
                        <td>
                            <strong>Registered: </strong>{userDetail.registered}
                        </td>
                    </tr>
                    <tr>
                        <td className='userfriends'>
                            <strong>Friends: </strong>{userDetail.friends.map(el=>el.name).join(", ")}
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