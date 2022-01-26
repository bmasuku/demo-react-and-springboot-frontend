import React, { Component } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)
            this.state ={
               id: Number(props.params.id),
               employee: {}
            }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(res =>{
            this.setState({employee:res.data});
        });
    }
    back(){
        this.props.navigate("/findall");
    }
    render() {
        return (
            <div>
                <br/><br/>
               <div className="card col-md-6 offset-md-3">
                   <h3 className="text-center">View Employee Details</h3>
                   <div className = "card-body">
                       <div className="row">
                        <label>FirstName: </label>
                        <div>{this.state.employee.firstname}</div>
                       </div>
                       <div className="row">
                        <label>LastName: </label>
                        <div>{this.state.employee.lastname}</div>
                       </div>
                       <div className="row">
                        <label>Email: </label>
                        <div>{this.state.employee.email}</div>
                       </div>
                   </div>
                   <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginLeft: "10px"}}>BACK</button>
               </div>
            </div>
        );
    }
}

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        params = {params}
        // etc...
      />
    );
  };
export default withRouter(ViewEmployeeComponent);