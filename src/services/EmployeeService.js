import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/";


class EmployeeService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL + 'findall');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + 'add-employee',employee);
    }

    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL + 'find-by-id/' + id);
    }

    updateEmployee(employee,id){
        return axios.put(EMPLOYEE_API_BASE_URL+ 'update/' + id,employee);
    }

    deleteEmployee(id){
    return axios.delete(EMPLOYEE_API_BASE_URL+ 'delete/' + id);
    }
}

export default new EmployeeService()