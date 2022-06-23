import axios from 'axios';
import config from '../config/config';
class AddressBookService{
    baseUrl=config.baseUrl;
    addPerson(data){
      return axios.post(`${this.baseUrl}/create`, data);
    }
    getAllPersons() {
      return axios.get(`${this.baseUrl}/get`);
    }
    getPerson(contactId) {
      return axios.get(`${this.baseUrl}/get/${contactId}`);
  }
  
  updatePerson(contactId,data) {
      return axios.put(`${this.baseUrl}/update/${contactId}`, data);
  }
  
  deletePerson(contactId) {
      return axios.delete(`${this.baseUrl}/delete/${contactId}`);
  }
  }
  export default new AddressBookService()