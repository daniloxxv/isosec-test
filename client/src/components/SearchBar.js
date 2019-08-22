import React from 'react'
function SearchBar (props) {
    const {setSearchQuery} = props
    const searchHandler = e => setSearchQuery(e.target.value)



    return (
        <div className="searchBar">
              <input className="input" onChange={(e)=>searchHandler(e)}type="text" name="search" placeholder="Search" />
        </div>
    )
}

export default SearchBar