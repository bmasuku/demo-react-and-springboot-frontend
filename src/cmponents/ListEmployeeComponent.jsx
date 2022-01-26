import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import {  useNavigate } from 'react-router-dom';


class ListEmployeeComponent extends Component {
    
    constructor(props){
        super(props)
        this.state={
            employees : []
        }
     
    
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees: res.data});
        });
    }
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
          this.setState({employees: this.state.employees.filter(employee => employee.id !== id)})  
        });
    }
    viewEmployee(id){
        EmployeeService.viewEmployee(id).then(

        )
    }
    
    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row md-6">
                 <button className="btn btn-primary btn-sm" onClick={() => {this.props.navigate("/add-employee/-1")}}>Add Employee</button>   
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                       { <button onClick={() => {this.props.navigate("/add-employee/" + employee.id)}} className="btn btn-info btn-sm">Update</button>}
                                       { <button style={{marginLeft: "10px"}} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger btn-sm">DELETE</button> }
                                       { <button style={{marginLeft: "10px"}} onClick={() => {this.props.navigate("/view-employee/" + employee.id)}} className="btn btn-primary btn-sm">VIEW</button> }
                                        </td>
                                    </tr>
                                    )

                                    
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    
}
const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        // etc...
      />
    );
  };

export default withRouter(ListEmployeeComponent);