import React, {useState, useEffect} from "react"
import axios from "axios"

export default function Sites(){
    const [sites, setSites] = useState([])
    const [tools, setTools] = useState([])

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
            mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    const showTools = (location) => {
        getTools(location)
    } 

    const mapSites = () => {
        return(
            sites.map(function(site) {
                return(
                    <div className="site-thumb">
                        <div>
                            <p>Location: {site.location}</p>
                            <p>Superintendent: {site.location}</p>
                            <button className="btn" onClick={() => showTools(site.location)}>Show Tools</button>
                        </div>
                    </div>
                    )
                })
        )
    }

    const mapTools = () => {
        return(
            tools.map(function(tool) {
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

    useEffect(() => {
        getSites()
    }, [])


    return(
        <div className="app">
            <div className="tool-cards-wrapper">
                {mapTools()}
            </div>
            <div className="sites-card-wrapper">
                {mapSites()}
            </div>

        </div>

    )
}