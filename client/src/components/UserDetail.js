import React from 'react'

function UserDetail(props){
    const {user,showTable} = props
    return (
        <section className='userDetail'>
            <h2>
                {user.name}
            </h2>
            
            <h3><strong>Gender:</strong>{user.gender}</h3>
            <h3><strong>Age:</strong>{user.age}</h3>
            <h3><strong>Email:</strong>{user.email}</h3>
            <h3><strong>Phone:</strong>{user.phone}</h3>
            <h3><strong>Address:</strong>{user.address}</h3>
            <h3><strong>Registered:</strong>{user.registered}</h3>

            <button onClick={showTable}>Return to table</button>
        </section>
    )
}


export default UserDetail