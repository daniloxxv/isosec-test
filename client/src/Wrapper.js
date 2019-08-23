import React, {useState, createContext} from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'
import {serverUrl} from './config'
import App from './App'

export const Context = createContext({})

function Wrapper() {
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
    axios.get(`${serverUrl}/api/users?name=${query}`)
      .then(users => {
        setUserList(users.data)
      })
      .catch(err => setErrorMessage('The server was unable to process your request; please try again later'))
  }

  const debouncedSearch = debounce(searchRequest,200) 

  const searchHandler = e => setSearchQuery(e.target.value)

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
    axios.get(`${serverUrl}/api/users/${id}/information`)
    .then(user=>{
        setErrorMessage('')
        setUserDetail(user.data)
        setDisplayDetail(true)
    })
    .catch(err=>setErrorMessage('The server was unable to process request; please try again later'))
  }

  return (
    <Context.Provider value={
      {debouncedSearch,
        searchHandler,
        getDetail,
        userList, 
        sortUsers,
        setUserList,
        userDetail,
        setUserDetail,
        searchQuery, 
        setSearchQuery,
        displayDetail,
        setDisplayDetail,
        errorMessage, 
        setErrorMessage,
        searchRequest
    }}>
        <App/>
    </Context.Provider>
  )

}

export default Wrapper;