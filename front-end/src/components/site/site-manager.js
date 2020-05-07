import React, {useState, useEffect} from "react"
import axios from "axios"

export default function SiteManager(){
    const [sites, setSites] = useState([])
    const [siteLocation, setSiteLocation] = useState("")
    const [siteSuperintendent, setSiteSuperintendent] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState("")

    const deleteSite = id => {
        axios
        .delete(`http://localhost:5000/delete-site/${id}`)
        .then(setSites(sites.filter(site => site.id !== id)))
        .catch(err => console.log("Delete Tool err: ", err))
    }

    const resetEditMode = () => {
        setSiteLocation(""),
        setSiteSuperintendent(""),
        setEditId(""),
        setEditMode(false)
    }

    const displayCancelButton = () => {
        if(editMode) {
            return(<button onClick={() => resetEditMode()}>Cancel</button>)
        }
    }


    const handleEditClick = (site) => {
        setSiteLocation(site.location)
        setSiteSuperintendent(site.superintendent)
        setEditId(site.id)
        setEditMode(true)
    }

    const getSites = () => {
        axios
        .get("http://localhost:5000/sites")
        .then(response => {
            setSites([...response.data])
            mapSites()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(editMode){
            axios
            .patch(`http://localhost:5000/site/${editId}`, {
                location: siteLocation,
                superintendent: siteSuperintendent 
            })
            .then((response) => {
                console.log("Item Patched: ", response)
            })
            .then(() => {
                setSiteLocation(""),
                setSiteSuperintendent(""),
                setEditId(""),
                setEditMode(false)
            })
            .catch((err) => {
                console.error(err)
            })
        } else {
            axios
            .post("http://localhost:5000/add-site", {
                location: siteLocation,
                superintendent: siteSuperintendent
            }).then(response => {
                console.log("handleSubmit response: ", response)
            }).then(
                setSiteSuperintendent(""),
                setSiteLocation("")
            ).then(
                getSites(),
                mapSites()
            ).catch(error => {
                console.log("handleSubmit error: ", error)
            })
        }
    }

    const mapSites = () => {
        return(
            sites.map(function(site) {
                return(
                    <div className="site-thumb">
                        <div>
                            <p>Location: {site.location}</p>
                            <p>Superintendent: {site.superintendent}</p>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleEditClick(site)}>Edit</button>
                            <button onClick={() => deleteSite(site.id)}>Delete</button>
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

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="siteLocation"
                        placeholder="Location"
                        value={siteLocation}
                        onChange={e => setSiteLocation(e.target.value)}
                    />
                </div>
                <div>
                <input
                    type="text"
                    name="siteSuperintendent"
                    placeholder="Superintendent"
                    value={siteSuperintendent}
                    onChange={e => setSiteSuperintendent(e.target.value)}
                />
                </div>
                <div>
                    <button type="submit">Save</button>
                    {displayCancelButton()}
                </div>
            </form>

        </div>

    )
}