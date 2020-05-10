import React from "react"

export default function SiteForm(props) {
    return(
        <div className="app">
            <h1>
                Hello from {props.id} {props.location}
            </h1>
        </div>
    )
}