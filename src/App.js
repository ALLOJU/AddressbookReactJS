
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AddressBookForm from './components/addressbookform';
import Dashboard from './components/dashboard';



function App() {
  return (
    
    <Router>
    <div className="App">

      <Switch>
        
      
        <Route exact path="/form" component={AddressBookForm}/> 
        <Route exact path="/form/:id" component={AddressBookForm}/> 
        <Route exact path="/" component={Dashboard}/>
        
      </Switch>
    </div>
  </Router>
    
  );
}


export default App;