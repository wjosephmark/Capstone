import React, {useState, useEffect} from "react"
import axios from "axios"

export default function Site(){
    const [tool, setTool] = useState([])
    const [searchedTool, setSearchedTool] = useState([])
    const [toolManufacturer, setToolManufacturer] = useState("")
    const [toolType, setToolType] = useState("")
    const [toolSite, setToolSite] =  useState("")
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [returnSearched, setReturnSearched] = useState(false)

    const handleEditClick = (tool) => {
        setToolManufacturer(tool.manufacturer)
        setToolType(tool.tool_type)
        setToolSite(tool.site)
        setEditId(tool.id)
        setEditMode(true)
    }

    const resetEditMode = () => {
        setToolManufacturer(""),
        setToolType(""),
        setToolSite(""),
        setEditId(""),
        setEditMode(false)
    }

    const displayCancelButton = () => {
        if(editMode) {
            return(<button className="btn" onClick={() => resetEditMode()}>Cancel</button>)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editMode){

            displayCancelButton()

            axios
            .patch(`https://jm-capstone-back-end.herokuapp.com/tool/${editId}`, {
                manufacturer: toolManufacturer,
                tool_type: toolType,
                site: toolSite  
            })
            .then((response) => {
                console.log("Item Patched: ", response)
                getTools()
                mapTools()
            })
            .then(() => {
                setToolManufacturer(""),
                setToolType(""),
                setToolSite(""),
                setEditId(""),
                setEditMode(false)
            })
            .catch((err) => {
                console.error(err)
            })
        } else {
            axios
            .post("https://jm-capstone-back-end.herokuapp.com/add-tool", {
                manufacturer: toolManufacturer,
                tool_type: toolType,
                site: toolSite
            }).then(response => {
                console.log("handleSubmit response: ", response),
                getTools()
                mapTools()
            }).then(
                setToolManufacturer(""),
                setToolType(""),
                setToolSite("")
            ).catch(error => {
                console.log("handleSubmit error: ", error)
            })
        }
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
    
    const deleteTool = id => {
        axios
        .delete(`https://jm-capstone-back-end.herokuapp.com/delete-tool/${id}`)
        .then(setTool(tool.filter(tool => tool.id !== id)))
        .catch(err => console.log("Delete Tool err: ", err))
    }

    const getSearchTools = () => {

        setReturnSearched(true)
        
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/tools")
        .then(response => {
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

    const handleShowAllTools = () => {
        setReturnSearched(false)
        mapTools()
    }

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
                            <div className="buttons">
                                <button className="btn" onClick={() => handleEditClick(tool)}>Edit Tool</button>
                                <button className="btn" onClick={() => deleteTool(tool.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            )
        } else {
            return(
                searchedTool.map(function(tool) {
                    return(
                        <div className="tool-thumb">
                            <div>
                                <p>Manufacturer: {tool.manufacturer}</p>
                                <p>Type: {tool.tool_type}</p>
                                <p>Site: {tool.site}</p>
                            </div>
                            <div className="buttons">
                                <button className="btn" onClick={() => handleEditClick(tool)}>Edit Tool</button>
                                <button className="btn" onClick={() => deleteTool(tool.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            )
        }
    }


    useEffect(() => {
        getTools()
    }, [])


    return(
        <div className="app">
            <div className="page-title">
                <h1>Tool Manager</h1>
            </div>

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

            <form className="form" onSubmit={handleSubmit}>
                <div className="input-wrappers">
                    <div>
                        <input
                            className="input"
                            type="text"
                            name="toolManufacturer"
                            placeholder="Manufacturer"
                            value={toolManufacturer}
                            onChange={e => setToolManufacturer(e.target.value)}
                        />
                    </div>
                    <div>
                    <input
                        className="input"
                        type="text"
                        name="toolType"
                        placeholder="Type"
                        value={toolType}
                        onChange={e => setToolType(e.target.value)}
                    />
                    </div>
                    <div>
                        <input
                            className="input"
                            type="text"
                            name="toolSite"
                            placeholder="Site"
                            value={toolSite}
                            onChange={e => setToolSite(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn" type="submit">Save</button>
                        {displayCancelButton()}
                    </div>
                </div>
            </form>
        </div>
    )
}
