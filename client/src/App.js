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

  const debouncedSearch = debounce(searchRequest,200)

  const searchHandler = e => setSearchQuery(e.target.value)

  const showDetail = () => setDisplayDetail(!displayDetail)

  const getDetail = id => {
    axios.get(`${serverUrl}/users/${id}/information`)
    .then(user=>{
      setErrorMessage('')
      setUserDetail(user.data)
      showDetail()
    })
    .catch(err=>setErrorMessage('The server was unable to process request; please try again later'))
  }

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

  useEffect(()=>{debouncedSearch(searchQuery)},[searchQuery])

  return (
    <div className="App">
        <h1>User Management</h1>
        <SearchBar searchHandler={searchHandler}/>
      {displayDetail ? 
        <UserDetail user={userDetail} showTable={showDetail} errorMessage={errorMessage}/> : 
        <UserTable userList={userList} getDetail={getDetail} setUserList={setUserList} errorMessage={errorMessage}/>
      }
    </div>
  );
}

export default App;