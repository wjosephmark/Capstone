import React, {Component} from "react"
import axios from "axios"

export default class Site extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            sites: []
        }
    }

    mapTools(){
        return(
            this.state.sites.map(function(site) {
                return(
                    <div className="tool-thumb">
                        <p>Location: {site.location}</p>
                        <p>Superintendent: {site.superintendent}</p>
                    </div>
                ) 
            })
        )
    }

    getSites(){
        axios
        .get("http://localhost:5000/sites")
        .then(response => {
            console.log("response: ", response.data)
            this.setState({
                sites: [...response.data]
            })
        }).catch(error => {
            console.error("getSites error: ", error)
        })
    }

    componentDidMount(){
        this.getSites()
    }

    

    render(){
        return(
            <div className="app">
                <div className="site-cards-wrapper">
                    {this.state.sites.map(function(site) {
                            return(
                                <div className="tool-thumb">
                                    <p>Location: {site.location}</p>
                                    <p>Superintendent: {site.superintendent}</p>
                                </div>
                            ) 
                        })
                    }
                </div>
            </div>
        )
    }
}