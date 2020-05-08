import React, {useState, useEffect} from "react"
import axios from "axios"

export default function Sites(){
    const [sites, setSites] = useState([])

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

    const mapSites = () => {
        return(
            sites.map(function(site) {
                return(
                    <div className="site-thumb">
                        <div>
                            <p>Location: {site.location}</p>
                            <p>Superintendent: {site.location}</p>
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
            <div className="sites-card-wrapper">
                {mapSites()}
            </div>

        </div>

    )
}