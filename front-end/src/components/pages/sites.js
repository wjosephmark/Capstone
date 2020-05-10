import React, {useState, useEffect} from "react"
import axios from "axios"
import {navigate} from "hookrouter"

import SiteForm from "../site/site-form"

export default function Sites(props){
    const [sites, setSites] = useState([])
    const [tools, setTools] = useState([])
    const [toolsOrSites, setToolsOrSites] = useState(true)
    const [searchInput, setSearchInput] = useState("")
    const [searchedTool, setSearchedTool] = useState([])

    const getSites = () => {
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/sites")
        .then(response => {
            setSites([...response.data])
            mapSites()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    const getTools = (location) => {
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/tools")
        .then(response => {
            setTools([...response.data.filter(item => {
                if(item.site === location) {
                    return item
                }
            })])
            // mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    const showTools = (location) => {
        getTools(location)
        setToolsOrSites(false)
        mapSites()
    }

    const handleShowSites = () => {
        setTools([])
        mapSites()
        setToolsOrSites(true)
    }

    const mapSites = () => {
        if(toolsOrSites){
            // console.log(tools)
            return(
                sites.map(function(site) {
                    return(
                        <div className="sites-card-wrapper">
                            <div className="site-thumb">
                                <div className="site-info">
                                    <p>Location: {site.location}</p>
                                    <p>Superintendent: {site.location}</p>
                                </div>
                                <div className="site-buttons">
                                    <button className="btn" onClick={() => showTools(site.location)}>Show Tools</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        } else if(!toolsOrSites){
            console.log(tools)
            if(tools.length === 0){
                return(
                    <div className="no-tools-wrapper">
                        <h1>No tools found at this location</h1>
                        <button className="btn" onClick={() => handleShowSites()}>Show sites</button>
                    </div>
                )
            } else {
                return(
                    tools.map(function(tool) {
                        return(
                            <div>
                                <div className="show-sites-button">
                                    <button className="btn" onClick={() => handleShowSites()}>Show sites</button>
                                </div>
                                <div className="tool-cards-wrapper-site">
                                    <div className="tool-thumb">
                                        <p>Manufacturer: {tool.manufacturer}</p>
                                        <p>Type: {tool.tool_type}</p>
                                        <p>Site: {tool.site}</p>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                )
            }
        }
    }

    // const mapTools = () => {
    //     return(
    //         tools.map(function(tool) {
    //             return(
    //                 <div className="tool-thumb">
    //                     <div>
    //                         <p>Manufacturer: {tool.manufacturer}</p>
    //                         <p>Type: {tool.tool_type}</p>
    //                         <p>Site: {tool.site}</p>
    //                     </div>
    //                 </div>
    //                 )
    //             })
    //     )
    // }

    useEffect(() => {
        getSites()
    }, [])


    return(
        <div className="site-app">
            <h1 className="site-page-title">
                sites
            </h1>
            {mapSites()}
        </div>

    )
}