import React, { Component } from 'react'
import './App.css';
import { Button } from '@material-ui/core';

export default class Ccomponent extends Component {

constructor(props) {
    super(props)

    this.state = {
        date: localStorage.getItem('date') || this.makeNowData(),
        error: null,
        isLoaded: false
    }
}


    componentDidMount = () => {
        fetch (`https://api.nasa.gov/planetary/apod?api_key=zhnAvg5YDp5Tav5H4gwXvUBPZdaaj0mfL6euQwv5&date=${this.state.date}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            console.log (result);
            this.setState ({
                isLoaded: true,
                url: result.url,
                idate: result.date
            });
        })
    }

    makeNowData = () => {
        let getCurrentDay = new Date();
        let year = getCurrentDay.getFullYear();
        let month = getCurrentDay.getMonth()+1;
        if ((month).toString.length === 1) month =  '0' + month;
        let day = getCurrentDay.getDate();
        let date = year + "-" + month + "-" + day ; 
        return date;
    }

    changeData = () => {
        this.setState (({
            date : document.getElementById('calendar').value
        }))
    }

    confirmDate = () => {
        localStorage.setItem('date', this.state.date);
        this.componentDidMount();
    }

    render() {
        const {error, isLoaded, url, idate} = this.state;
        if (!isLoaded) return <p>Loading ...</p>
        else if (error) return <p> Error : {error.mesage} </p>
        else {
            return (
                <div>
                    <header className="App-header">
                        Choice data : 
                        <input type="date" value = {this.state.date} onChange = {this.changeData} id = 'calendar'/>
                        <Button variant="contained" onClick = {this.confirmDate} color="primary">Save the date and download image</Button>
                        <img src= {url} alt = 'Invalid date'/>
                    </header>
                </div>
            )
        }
    }
}
