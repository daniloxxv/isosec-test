import React from 'react'

function SearchBar (props) {

return (
    <div className="searchBar">
          <input className="input" onChange={(e)=>props.searchHandler(e)}type="text" name="search" placeholder="Search" />
    </div>
    )
}

export default SearchBar