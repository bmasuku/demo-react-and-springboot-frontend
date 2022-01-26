import React, { Component } from 'react';
import {  useNavigate, useParams} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeCompnent extends Component {
    constructor(props){
        super(props)
        console.log(props.params.id);
            this.state ={
                id: Number(props.params.id),
               firstname:'',
               lastname:'',
               email:''
            }
         this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
         this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
         this.changeEmailnameHandler = this.changeEmailHandler.bind(this);
         this.updateEmployee = this.updateEmployee.bind(this);
       }
       componentDidMount(){
            console.log("State info: ",this.state);
           EmployeeService.getEmployeeById(this.props.params.id).then((res)=>{
            let employee = res.data;
            this.setState({firstname: employee.firstname,
            lastname: employee.lastname,
            email:employee.email});
           });
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
       updateEmployee = (e)=>{
           e.preventDefault();
           console.log("ID "+ this.state.id);
           let employee = {firstname:this.state.firstname,
               lastname:this.state.lastname,
               email:this.state.email
            };
            console.log('employee =>' + JSON.stringify(employee));
      EmployeeService.updateEmployee(employee,this.state.id).then(res =>{
               this.props.navigate("/findall");
           });
       }
       cancel(){
           this.props.navigate("/findall");
   
       }
       render() {
           return (
               <div>
                   
                   <div className = "container">
                       <div className = "row">
                           <div className = "card col-md-6 offset-md-3 offset-md-3">
                           <h3 className="text-center">Edit Employee</h3>
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
                                   <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
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
   

export default withRouter(UpdateEmployeeCompnent);