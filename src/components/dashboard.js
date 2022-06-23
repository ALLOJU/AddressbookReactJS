import React, { useEffect, useState } from "react";
import './dashboard.css';
import logo from '../../src/components/assets/logo.jpeg';
import {Link} from "react-router-dom";
import addressbookservice from "../services/addressbookservice";
import AddressBook from "./addressbook";

function Dashboard() {
    const [personArray, setPerson] = useState([]);

    useEffect(() => {
        getAllPersons();
    }, []);
    
    const getAllPersons= () => {
       addressbookservice.getAllPersons().then(person => {
           const allPersons = person.data.data;
           setPerson(allPersons);
       }).catch((error) => {
           alert(error);
       })
    }
    
    return (
        <>
            <header className="header-content header">
                <div className="logo-content">
                    <img src={logo} alt="logo"/>
                    <div>
                        <span className="addressBook-text">Address</span><br/>
                        <span className="addressBook-text addressBook-book">Book</span>
                    </div>
                </div>
            </header>
            <div className="main-content">
                <div className="header-content person-header">
                    <div className="person-detail-text">
                        Person Details
                        <div className="person-count">{personArray.length}</div>
                    </div>
                    <Link to="/form" className="add-button">
                        <img className="add-button" src="../../src/components/assets/add-24px.svg"alt=""/>Add Person
                    </Link>
                </div>
                <div className="table-main">
                <AddressBook personArray={personArray}/>
                </div>
            </div>
        </>
    );
}
export default Dashboard;