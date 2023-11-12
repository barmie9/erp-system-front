import axios from "axios";
import AuthenticationHeader from "./AuthenticationHeader";

const apiUrl = 'http://localhost:8080/';

class ApiDataService{
    getOrders(){
        console.log("ORDERS: ", AuthenticationHeader());
        return axios.get(apiUrl + 'orders', {headers: AuthenticationHeader() });
    }

}

export default new ApiDataService();