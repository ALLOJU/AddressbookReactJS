import axios from 'axios';
import config from '../config/config';
class AddressBookService{
    baseUrl=config.baseUrl;
    addPerson(data){
      return axios.post(`${this.baseUrl}addressbook`, data);
    }
    getAllPersons() {
      return axios.get(`${this.baseUrl}addressbook`);
    }
    getPerson(personID) {
      return axios.get(`${this.baseUrl}addressbook/${personID}`);
  }
  
  updatePerson(personID,data) {
      return axios.put(`${this.baseUrl}addressbook/${personID}`, data);
  }
  
  deletePerson(personID) {
      return axios.delete(`${this.baseUrl}addressbook/${personID}`);
  }
  }
  export default new AddressBookService()