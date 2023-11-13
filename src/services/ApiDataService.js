import axios from "axios";
import AuthenticationHeader from "./AuthenticationHeader";

const apiUrl = 'http://localhost:8080/';

class ApiDataService{
    getOrders(){
        console.log("ORDERS: ", AuthenticationHeader());
        return axios.get(apiUrl + 'orders', {headers: AuthenticationHeader() });
    }

    getSpecializations(){
        return axios.get(apiUrl + 'api/auth/specializations');
    }

}

export default new ApiDataService();