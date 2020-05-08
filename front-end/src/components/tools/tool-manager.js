import React, {useState, useEffect} from "react"
import axios from "axios"

export default function Site(){
    const [tool, setTool] = useState([])
    const [newTool, setNewTool] = useState("")
    const [toolManufacturer, setToolManufacturer] = useState("")
    const [toolType, setToolType] = useState("")
    const [toolSite, setToolSite] =  useState("")
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState("")


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
                setNewToolFunction(response)
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

    const setNewToolFunction = (response) => {
        // console.log(response.data)
        setNewTool("new tool data :", ...response.data)
        console.log(newTool)

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
    
    useEffect(() => {
        getTools()
    }, [])

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
                        <div className="buttons">
                            <button className="btn" onClick={() => handleEditClick(tool)}>Edit Tool</button>
                            <button className="btn" onClick={() => deleteTool(tool.id)}>Delete</button>
                        </div>
                    </div>
                    )
                })
        )
    }

    return(
        <div className="app">
            <div className="page-title">
                <h1>Tool Manager</h1>
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
