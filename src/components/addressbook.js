import React from "react";
import "../components/dashboard.css";
import editLogo from '../../src/components/assets/create-black-18dp.svg';
import deleteLogo from '../../src/components/assets/delete-black-18dp.svg';
import { withRouter } from "react-router-dom";
import addressbookservice from "../services/addressbookservice";
const AddressBook = (props) => {
    const update= (contactId) => {
        props.history.push(`form/${contactId}`);
    }

    const remove = (contactId) => {
        addressbookservice.deletePerson(contactId).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch((error) =>{
            alert(error)
        })
    }
return (
<table id="table-display" className="table">
<tr key={-1}>
    <th>Full Name</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip Code</th>
    <th>Phone Number</th>
    <th>Actions</th>
</tr>
{
                    props.personArray && props.personArray.map((element, index) =>(
                       <tr key={index}>
                            <td>{element.fullName}</td>
                            <td>{element.address}</td>
                            <td>{element.city}</td>
                            <td>{element.state}</td>
                            <td>{element.zip}</td>
                            <td>{element.phone}</td>
                            
                            
                            
                            
                            <td>
                                <img src={editLogo} alt="edit" onClick={() => update(element.contactId)}/>
                                <img src={deleteLogo} alt="deleteLogo" onClick={() => remove(element.contactId)} />
                            </td>
                       </tr> 
                    ))
                }
</table>
    );
}
export default withRouter(AddressBook);