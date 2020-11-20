import React, { Component } from 'react';
import Search from '../Search/Search';
import Table from '../Table/table';
import Header from "../Header/header";
import axios from 'axios';
 
let resArray;
export default class State extends Component {
    // initializes state for later use
    state = {
        search: "",
        results: [],
        acsend: false
    }
    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=150')
            .then(res => {
                resArray = res.data.results.map(person => {
                    var dateString = person.dob.date;
                    var d = new Date(dateString);
                    var correctDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
                    return {
                        image: person.picture.large,
                        name: `${person.name.first} ${person.name.last}`,
                        phone: person.phone,
                        email: person.email,
                        dob: correctDate,
                        age: person.dob.age
                    }
                });
                // sets the results state to the new array 
                this.setState({ results: resArray })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChange = event => {
        const key = event.target.value;
        const filter = resArray.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(key)));
        this.setState({
            search: key,
            results: filter
        });
    }
    sortBy = sort => {
        if (this.state.ascend === true) {
            const acsendFalse = this.state.results.sort((a, b) => a[sort] < b[sort] ? 1 : -1);

            this.setState({
                results: acsendFalse,
                ascend: false
            });
        } else {
            const acsendTrue = this.state.results.sort((a, b) => a[sort] > b[sort] ? 1 : -1);

            this.setState({
                results: acsendTrue,
                ascend: true
            });
        }
    }
    toTop = () => {
        document.documentElement.scrollTop = 0;
    }
    render() {
        return (
            <div>
                <Header toTop={this.toTop}/>
                <Search search={this.state.search} handleChange={this.handleChange} />
                <Table results={this.state.results} sortBy={this.sortBy} />
            </div>
        )
    }
}