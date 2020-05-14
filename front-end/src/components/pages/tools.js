import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

export default function Tool() {
        
    const [tool, setTool] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [searchedTool, setSearchedTool] = useState([])
    const [returnSearched, setReturnSearched] = useState(false)

    const mapTools = () => {
        if(!returnSearched){
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
        } else {
            if(searchedTool.length > 0){
                return(
                    searchedTool.map(function(tool) {
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
            } else {
                return(
                    <div className="page-title">
                        <h1>No tools match search.</h1>
                    </div>
                )
            }
        }
    }

    const getSearchTools = () => {

        setReturnSearched(true)
        
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/tools")
        .then(response => {
            setSearchInput("")
            setSearchedTool([...response.data.filter(item => {
                if(item.manufacturer.toLowerCase().includes(searchInput)){
                    console.log(item)
                    return item
                } else if(item.tool_type.toLowerCase().includes(searchInput)){
                    console.log(item)
                    return item
                } else if(item.site.toLowerCase().includes(searchInput)){
                    console.log(item)
                    return item
                }
            })])
            console.log(searchedTool)
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

    const handleShowAllTools = () => {
        setReturnSearched(false)
        mapTools()
    }


    useEffect(() => {
        getTools()
    }, [])


        return(
            <div className="app">
                <div className="search-wrapper">
                    <input 
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search"
                    className="input"
                    />
                </div>

                <div className="button-wrapper">
                    <button className="btn" onClick={() => getSearchTools()}>Search</button>
                    <button className="btn" onClick={() => handleShowAllTools()}>Show all tools</button>
                </div>
                <div className="tool-cards-wrapper">
                    {mapTools()}
                </div>
            </div>
        )

}