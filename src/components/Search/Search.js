  
import React from 'react';
import './search.css';

function Search(props) {
    return (
            <form>
                <input type="text" className="form-control" value={props.search} onChange={props.handleChange} placeholder="search"/>
            </form>
    )
}
export default Search