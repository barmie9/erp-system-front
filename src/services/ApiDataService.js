import axios from "axios";
import AuthenticationHeader from "./AuthenticationHeader";

const apiUrl = 'http://localhost:8080/';

class ApiDataService{
    getOrders(){
        return axios.get(apiUrl + 'orders');
    }
    
}

export default new ApiDataService();