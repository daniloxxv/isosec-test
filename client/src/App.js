import React, {useState} from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'
import './App.css';
import SearchBar from './components/SearchBar'
import UserTable from './components/UserTable'
import UserDetail from './components/UserDetail'

function App() {
  const [userList, setUserList] = useState([])
  const [userDetail,setUserDetail] = useState({})
  const [displayDetail,setDisplayDetail] = useState(false)

  const searchRequest = query => {
    if (!query || query.length < 2) return;
    axios.get(`http://localhost:3001/users?name=${query}`)
      .then(users => {
        setUserList(users.data)
      })
      .catch(err => console.log(err))
  }

  const debouncedSearch = debounce(searchRequest,250)

  const searchHandler = e => {
    debouncedSearch(e.target.value)
  }
  const showDetail = () => setDisplayDetail(!displayDetail)

  const getDetail = id => {
    axios.get(`http://localhost:3001/users/${id}/information`)
    .then(user=>{
      setUserDetail(user.data)
      console.log(user.data)
      showDetail()
    })
    .catch(err=>console.log(err))
  }


  return (
    <div className="App">
      <SearchBar searchHandler={searchHandler}/>
      {displayDetail ? 
        <UserDetail user={userDetail} showTable={showDetail}/> : 
        <UserTable userList={userList} getDetail={getDetail} showTable={showDetail}/>
      }
    </div>
  );
}

export default App;