import React, {useState, useEffect} from "react"
import axios from "axios"

export default function Site(){
    const [tool, setTool] = useState([])
    const [toolToEdit, setToolToEdit] = useState({})
    const [toolManufacturer, setToolManufacturer] = useState("")
    const [toolType, setToolType] = useState("")
    const [toolSite, setToolSite] =  useState("")


    handleEditClick = (tool) => {
        this.setState({
            toolToEdit: tool
        })
    }

    handleSubmit(event){
        axios
        .post("http://localhost:5000/add-tool", {
            manufacturer: this.state.toolManufacturer,
            tool_type: this.state.toolType,
            site: this.state.toolSite
        }).then(response => {
            console.log("handleSubmit response: ", response)
        }).then(
            this.setState({
                toolManufacturer: "",
                toolType: "",
                toolSite: ""
            })
        ).catch(error => {
            console.log("handleSubmit error: ", error)
        })
        event.preventDefault()
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    mapTools = () => {
        return(
            this.state.tool.map(function(tool) {
                return(
                    <div className="tool-thumb">
                        <div>
                            <p>Tool ID: {tool.id}</p>
                            <p>Manufacturer: {tool.manufacturer}</p>
                            <p>Type: {tool.tool_type}</p>
                            <p>Site: {tool.site}</p>
                        </div>
                        <button onClick={() => console.log(tool)}>Log tool</button>
                        <button onClick={() => this.handleEditClick(tool)}>Edit Tool</button>
                        <button onClick={() => this.handleDeleteClick(tool)}>Delete</button>
                    </div>
                    )
                })
        )
    }

    getTools(){
        axios
        .get("http://localhost:5000/tools")
        .then(response => {
            this.setState({
                tool: [...response.data]
            })
            this.mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    // handleDeleteClick(tool){
    //     axios.delete(`http://localhost:5000/delete-tool/1`)
    //     .then(response => {
    //     //     this.setState({
    //     //         tool: this.state.tool.filter(tool => {
    //     //             return tool.id !== tool.id
    //     //          })
    //     //     })
    
    //     //   return response.data
    //     console.log(response)
    //     })
    //     .catch(error =>{
    //         console.log("handleDeleteClick error", error)
    //     })
    // }

    componentDidMount(){
        this.getTools()
    }

    render(){
        return(
            <div className="app">
                <h1>Tool Manager</h1>

                <div className="tool-cards-wrapper">
                    {this.mapTools()}
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="toolManufacturer"
                            placeholder="Manufacturer"
                            value={this.state.toolManufacturer}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                    <input
                        type="text"
                        name="toolType"
                        placeholder="Type"
                        value={this.state.toolType}
                        onChange={this.handleChange}
                    />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="toolSite"
                            placeholder="Site"
                            value={this.state.toolSite}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}