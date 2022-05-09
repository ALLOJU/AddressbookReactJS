import React ,{useState} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import './addressbook-form.css'
import logo from '../../src/components/assets/logo.jpeg';
import cancelLogo from '../../src/components/assets/cancelButton.jpeg';
import {Link} from "react-router-dom"
import addressbookservice from "../services/addressbookservice";
const AddressBookForm = (props) => {

    const [user, setUser] = useState({
        name: '',
        phoneNumber:'',
        address: '',
        city:'',
        state:'',
        zip:'',
        error: {
            name: '',
            phoneNumber:'',
            address: '',
            city:'',
            state:'',
            zip:''
        }
    });
    const [validation, setValidation] = useState({
        name: '',
        phoneNumber:'',
        address: '',
        city:'',
        state:'',
        zip:'',
      });
    const params = useParams();

    const getPersonById = (id) => {
        addressbookservice.getPerson(id).then((response) => {
            let obj = response.data;
            console.log(obj);
            setData(obj);
        }).catch((error) => {
            alert(error);
        });
    }
   
    const setData = (obj) => {
       setUser({
            ...user,
            ...obj,
            name: obj.name,
            phoneNumber:obj.phoneNumber,
            address: obj.address,
            city:obj.city,
            state:obj.state,
            zip:obj.zip,
            isUpdate: true,
      
        });
    }
    
    useEffect(() => {
       if (params.id) {
        getPersonById(params.id);
       }
   }, []);
  
    const save = async (event) => {
        event.preventDefault();
      
     
        let object = {
            name: user.name,
            phoneNumber:user.phoneNumber,
            address: user.address,
            city:user.city,
            state:user.state,
            zip:user.zip,
        }
      
        if (user.isUpdate) {
            addressbookservice.updatePerson(params.id, object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
        else {
            addressbookservice.addPerson(object).then(() => {
                console.log("data added successfully");
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
          
        }
    
    
     }
     const reset = (obj) => {
        setUser({...obj, id: user.id, isUpdate: user.isUpdate});
    }
    

    const changeValue = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
        console.log(event.target.value)
        
    }
    const checkValidation = () => {
        let errors = {...validation}
        let isError=false;
        //first Name validation
        const fullName =
        "/^[A-Z]{1}[a-z]{2,}$/";
      if (!user.name.trim()) {
        errors.name = "Name is required";
      } else if (!user.name.match(fullName)) {
        errors.name = "Please enter a valid Name ";
      } else {
        errors.name = "";
      }
        if (!user.phoneNumber.trim()) {
           
          errors.phoneNumber = "Phone number is required";
        } else {
          errors.phoneNumber = "";
        }
        if (!user.address.trim()) {
           
            errors.address = "Address is required";
          } else {
            errors.address = "";
          }
          
          if (!user.city.trim()) {
           
            errors.city = "City is required";
          } else {
            errors.city = "";
          }
    
        setValidation(errors);
        
      };
    
      useEffect(() => {
        checkValidation();
      }, [user]);
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
            <div className="form-content">
                <form action="#" className="form" onReset="resetForm()" onSubmit={save}>
                    <div className="form_header">
                        <div className="form_header_text">Person Address Form</div>
                        <Link  to="/"><img src={cancelLogo}
                                                                       alt="logo"/></Link>
                    </div>

                    <div className="form_content">
                        <div className="row_content">
                            <label htmlFor="name" className="label text">Full Name</label>
                            <br/>
                                <input type="text" className="input" id="name" name="name" value={user.name} onChange={(e) => changeValue(e)} placeholder="Full Name"
                                       autoComplete="off" />
                                   {/* <error className="error">{user.error.name}</error> */}
                        </div>
                        {validation.name && <p>{validation.name}</p>}
                        {validation.name && console.log(validation)}
                        <div className="row_content">
                            <label htmlFor="phoneNumber" className="label text">Phone Number</label>
                            <br/>
                                <input type="tel" className="input" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={changeValue}
                                       placeholder="Phone Number"
                                       autoComplete="off" />
                                     {/* <error className="error">{user.error.phoneNumber}</error> */}
                        </div>
                        {validation.phoneNumber && <p>{validation.phoneNumber}</p>}
                        {validation.phoneNumber && console.log(validation)}
                        <div className="row_content">
                            <label htmlFor="address" className="label text">Address</label>
                            <br/>
                                <textarea name="address" id="address" placeholder="Address" autoComplete="off" value={user.address} onChange={changeValue}
                                          ></textarea>
                                 {/* <error className="error">{user.error.Address}</error> */}
                        </div> 
                        {validation.address && <p>{validation.address}</p>}
                        {validation.address && console.log(validation)}
                        <div className="row_content">
                            <div className="column_constrains">
                                <div className="column_content">
                                    <label htmlFor="city" className="label text">City</label>
                                    <br/>
                                        <select name="city" id="city" value={user.city} onChange={changeValue}  >
                                            <option selected  value="Select City">Select City</option>
                                            <option value="Warangal">Warangal</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Hyderabad">Hyderabad</option>
                                        </select>
                                        {/* <error className="error">{user.error.city}</error> */}
                                </div>
                                {validation.city && <p>{validation.city}</p>}
                                {validation.city && console.log(validation)}
                                <div className="column_content">
                                    <label htmlFor="state" className="label text">State</label>
                                    <br/>
                                        <select name="state" id="state"value={user.state} onChange={changeValue}>
                                            <option selected  value="Select State">Select State</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                        </select>
                                        <error className="error">{user.error.state}</error>
                                </div>
                                <div className="column_content">
                                    <label htmlFor="zip" className="label text">Zip code</label>
                                    <br/>
                                        <input type="text" className="input zipcode" id="zip" name="zip"value={user.zip} onChange={changeValue}
                                               autoComplete="off" placeholder="Zip Code"
                                               />
                                             <error className="error">{user.error.zip}</error>
                                </div>
                            </div>
                        </div>
                        <div className="button_content">
                            <button type="submit" className="button button_submit" id="submitButton">{user.isUpdate ? 'Update' : 'Submit'}</button>
                            <button className="button resetButton" type="reset" onClick={reset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default AddressBookForm;