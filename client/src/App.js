import React, {useContext} from 'react';
import {Context} from './Wrapper'
import './App.css';
import SearchBar from './components/SearchBar'
import UserTable from './components/UserTable'
import UserDetail from './components/UserDetail'

function App() {
  const {displayDetail} = useContext(Context)

  return (
    <div className="App">
        <h1>User Management</h1>
        <SearchBar/>
      {displayDetail ? 
        <UserDetail/> : 
        <UserTable />
      }
    </div>
  );
}

export default App;