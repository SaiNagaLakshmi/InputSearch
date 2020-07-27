import React from 'react';
import '../Assignments/Search.css';
import axios from 'axios';
export class Search extends React.Component {
    state = {
        data: [],
        searchItems: "",
        searchResults: [],
        searchData: false
    }
    componentDidMount() {
        fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
            .then(response => response.json())
            .then(json => this.setState({ data: json }))
    }
    handleCatch = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => this.catching())
    }
    catching = () => {
        const searchResults = this.state.data.reduce((acc, result) => {
            if (result && result.id.match(this.state.searchItems) || result && result.name.match(this.state.searchItems) || result && result.address.match(this.state.searchItems) || result && result.pincode.match(this.state.searchItems)) {
                acc.push(result)
            }
            return acc;
        }, [])
        this.setState({ searchResults, searchData: true })
    }
    truncate = (data) => data && data.map(val => (
        <tr>
            <td>{val.id}</td>
            <td>{val.name}</td>
            <td>{val.items}</td>
            <td>{val.address}</td>
            <td>{val.pincode}</td>




        </tr>
    ))
    render() {
        console.log(this.state.searchResults)
        return (
            <div>
                <div className="container-fluid">
                <label className="search-label" htmlFor="search-input">
                    <input type="text" id="myInput" className="wid" onChange={this.handleCatch} placeholder="Search for Users id,name,items,address,pincode" title="Type in a name" name="searchItems" />
                    <i className="fa fa-search search-icon sea" /></label>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>items</th>
                            <th>address</th>
                            <th>pincode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.searchData ? this.truncate(this.state.searchResults) : this.truncate(this.state.data)}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
