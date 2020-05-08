import React, {useState, useEffect, Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

export default class Tool extends Component {
    constructor(props){
        super(props) 
        
        this.state={
            tool: [],
            toolToEdit: {}
        }
        this.mapTools = this.mapTools.bind(this)
    }

    mapTools(){
        return(
            this.state.tool.map(function(tool) {
                return(
                    <div className="tool-thumb">
                        <div>
                            <p>Tool ID: {tool.id}</p>
                            <p>Tool Type: {tool.tool_type}</p>
                            <p>Tool Site: {tool.site}</p>
                        </div>
                    </div>
                    )
                })
        )
    }

    getTools(){
        axios
        .get("https://jm-capstone-back-end.herokuapp.com/tools")
        .then(response => {
            this.setState({
                tool: [...response.data]
            })
            this.mapTools()
        }).catch(error => {
            console.log("getBlogItem error: ", error)
        })
    }

    componentDidMount(){
       this.getTools()
    }

    
    render(){
        return(
            <div className="app">
                <div className="tool-cards-wrapper">
                    <p>{this.mapTools()}</p>
                </div>
            </div>
        )
    }

}