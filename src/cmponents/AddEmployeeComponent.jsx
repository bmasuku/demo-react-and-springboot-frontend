import React, { Component } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

class AddEmployeeComponent extends Component {
    constructor(props){
     super(props)
         this.state ={
             
            id: Number(props.params.id),
            firstname:'',
            lastname:'',
            email:''
         }
      this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
      this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
      this.changeEmailnameHandler = this.changeEmailHandler.bind(this);
      this.saveEmployee = this.saveEmployee.bind(this);
    }
    //Step 3
    componentDidMount(){
       //step 4
       if(this.state.id === -1){
           return
       }else{

       
       EmployeeService.getEmployeeById(this.props.params.id).then((res)=>{
        let employee = res.data;
        this.setState({firstname: employee.firstname,
        lastname: employee.lastname,
        email:employee.email});
       });
        }
   }
    changeFirstnameHandler = (event) =>{
        this.setState({firstname: event.target.value});
    }
    changeLastnameHandler = (event) =>{
        this.setState({lastname: event.target.value});
    }
    changeEmailHandler = (event) =>{
        this.setState({email: event.target.value});
    }
    saveEmployee = (e)=>{
        e.preventDefault();
        let employee = {firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email
         };
         console.log('employee =>' + JSON.stringify(employee));
        //step 5
        if(this.state.id === -1){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.navigate("/findall");
            });
        }else{
            EmployeeService.updateEmployee(employee,this.state.id).then(res =>{
                this.props.navigate("/findall");
            });
        }
        
    }
    cancel(){
        this.props.navigate("/findall");

    }
    getTitle(){
        if(this.state.id === -1){
           return <h3 className="text-center">Add Employee</h3>  
        }else{
           return <h3 className="text-center">Edit Employee</h3>
        }
    }
    render() {
        return (
            <div>
                
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                        {
                            this.getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Firstname</label>
                                    <input placeholder="Firstname" name="firstname"
                                     className="form-control" value={this.state.firstname} onChange={this.changeFirstnameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Lastname</label>
                                    <input placeholder="Lastname" name="lastname"
                                     className="form-control" value={this.state.lastname} onChange={this.changeLastnameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input placeholder="Email" name="email"
                                     className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                                </div>
                                <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    {/* step 2 */}
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        params={params}
        // etc...
      />
    );
  };

export default withRouter(AddEmployeeComponent);