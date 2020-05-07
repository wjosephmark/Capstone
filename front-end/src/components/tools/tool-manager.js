import React, {useState, useEffect} from "react"
import axios from "axios"

export default function Site(){
    const [tool, setTool] = useState([])
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
            return(<button onClick={() => resetEditMode()}>Cancel</button>)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(editMode){

            displayCancelButton()

            axios
            .patch(`http://localhost:5000/tool/${editId}`, {
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
            .post("http://localhost:5000/add-tool", {
                manufacturer: toolManufacturer,
                tool_type: toolType,
                site: toolSite
            }).then(response => {
                console.log("handleSubmit response: ", response)
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
        .get("http://localhost:5000/tools")
        .then(response => {
            setTool([...response.data])
            mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }
    
    const deleteTool = id => {
        axios
        .delete(`http://localhost:5000/delete-tool/${id}`)
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
                            <p>Tool ID: {tool.id}</p>
                            <p>Manufacturer: {tool.manufacturer}</p>
                            <p>Type: {tool.tool_type}</p>
                            <p>Site: {tool.site}</p>
                        </div>
                        <button onClick={() => handleEditClick(tool)}>Edit Tool</button>
                        <button onClick={() => deleteTool(tool.id)}>Delete</button>
                    </div>
                    )
                })
        )
    }

    return(
        <div className="app">
            <h1>Tool Manager</h1>

            <div className="tool-cards-wrapper">
                {mapTools()}
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="toolManufacturer"
                        placeholder="Manufacturer"
                        value={toolManufacturer}
                        onChange={e => setToolManufacturer(e.target.value)}
                    />
                </div>
                <div>
                <input
                    type="text"
                    name="toolType"
                    placeholder="Type"
                    value={toolType}
                    onChange={e => setToolType(e.target.value)}
                />
                </div>
                <div>
                    <input
                        type="text"
                        name="toolSite"
                        placeholder="Site"
                        value={toolSite}
                        onChange={e => setToolSite(e.target.value)}
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
