import React, {useState, useEffect} from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'
import './App.css';
import SearchBar from './components/SearchBar'
import UserTable from './components/UserTable'
import UserDetail from './components/UserDetail'
import {serverUrl} from './config'

function App() {
  const [userList, setUserList] = useState([])
  const [userDetail,setUserDetail] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [displayDetail,setDisplayDetail] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const searchRequest = query => {
    setErrorMessage('')
    if (!query || query.length < 2) {
      setUserList([])
      return
    }
    axios.get(`${serverUrl}/users?name=${query}`)
      .then(users => {
        setUserList(users.data)
      })
      .catch(err => setErrorMessage('The server was unable to process your request; please try again later'))
  }

  useEffect(()=>{debounce(searchRequest,200)(searchQuery)},[searchQuery])

  return (
    <div className="App">
        <h1>User Management</h1>
        <SearchBar setSearchQuery={setSearchQuery}/>
      {displayDetail ? 
        <UserDetail user={userDetail} setDisplayDetail={setDisplayDetail} errorMessage={errorMessage}/> : 
        <UserTable setUserDetail={setUserDetail} setDisplayDetail={setDisplayDetail} userList={userList} setUserList={setUserList} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
      }
    </div>
  );
}

export default App;