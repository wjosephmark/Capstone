import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

export default function Tool() {
        
    const [tool, setTool] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [searchedTool, setSearchedTool] = useState([])

    const handleSubmit = () => {
        getSearchTools()
        // mapSearchedTools()
    }

    const mapTools = () => {
        return(
            tool.map(function(tool) {
                return(
                    <div className="tool-thumb">
                        <div>
                            <p>Manufacturer: {tool.manufacturer}</p>
                            <p>Type: {tool.tool_type}</p>
                            <p>Site: {tool.site}</p>
                        </div>
                    </div>
                )
            })
        )
    }
    
    const getSearchTools = () => {
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/tools")
        .then(response => {
            setSearchedTool([...response.data.filter(item => {
                if(item.manufacturer.toLowerCase().includes(searchInput)){
                    console.log(item)
                    return item
                } else if(item.toLowerCase().includes(searchInput)){
                    console.log(item)
                    return item
                } else if(item.toLowerCase().includes(searchInput)){
                    console.log(item)
                    return item
                }
            })])
            mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        }) 
    }


    const getTools = () => {
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/tools")
        .then(response => {
            setTool([...response.data])
            mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    useEffect(() => {
        getTools()
    }, [])


        return(
            <div className="app">
                <div className="search-bar-wrapper">
                    <form onSubmit={handleSubmit}>
                        <input 
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="Search"
                        className="input"
                        />
                        <button type="submit" className="btn">Search</button>
                    </form>
                </div>
                <div className="tool-cards-wrapper">
                    {mapSearchedTools()}
                    {mapTools()}
                </div>
            </div>
        )

}