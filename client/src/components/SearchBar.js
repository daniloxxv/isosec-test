import React, {useEffect, useContext} from 'react'
import {Context} from '../Wrapper'

function SearchBar () {
    const {debouncedSearch,searchHandler, searchQuery} = useContext(Context)
    useEffect(()=>{debouncedSearch(searchQuery)},[searchQuery])
    
    return (
        <div className="searchBar">
              <input className="input" onChange={(e)=>searchHandler(e)}type="text" name="search" placeholder="Search" />
        </div>
    )
}

export default SearchBar