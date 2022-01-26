import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ListEmployeeComponent from './cmponents/ListEmployeeComponent';
import HeaderComponent from './cmponents/HeaderComponent';
import FooterComponent from './cmponents/FooterComponent';
import AddEmployeeComponent from './cmponents/AddEmployeeComponent';
import UpdateEmployeeComponent from './cmponents/UpdateEmployeeCompnent';
import ViewEmployeeComponent from './cmponents/ViewEmployeeComponent';
import ErrorComponent from './cmponents/ErrorComponent';


function App() {
  return (
    <div>
      <Router>
      <HeaderComponent></HeaderComponent>
      <div className="container">
        <Routes> 
          <Route path ="/" element = {<ListEmployeeComponent />} />
          <Route path ="/findall" element = {<ListEmployeeComponent />} />
          {/* step 1 */}
          <Route path ="/add-employee/:id" element = {<AddEmployeeComponent />} />
          <Route path ="/view-employee/:id" element = {<ViewEmployeeComponent />} />
          {/* <Route path ="/update/:id" element = {<UpdateEmployeeComponent />} /> */}
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        
      </div>
    <FooterComponent></FooterComponent>
    </Router>
    </div>
    
  );
}

export default App;
