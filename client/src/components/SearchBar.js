import React from 'react'
function SearchBar (props) {
const {searchHandler} = props
return (
    <div className="searchBar">
          <input className="input" onChange={(e)=>searchHandler(e)}type="text" name="search" placeholder="Search" />
    </div>
    )
}

export default SearchBar