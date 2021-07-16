
import './App.css';

import {Route,BrowserRouter} from 'react-router-dom'

import Login from '../src/component/screens/Login'
import Dashboard1 from './component/screens/Dashboard1';
import Product from './component/screens/Product';




function App() {
  return (
    <div className="App">
       
     <BrowserRouter> 
      <Route path="/Login"><Login/> </Route>
      <Route path="/Dashboard1"><Dashboard1/> </Route>
      <Route path="/Product"><Product/> </Route>
     </BrowserRouter>
   
    </div>
  );
}

export default App;
