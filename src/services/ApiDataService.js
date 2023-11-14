import axios from "axios";
import AuthenticationHeader from "./AuthenticationHeader";

const apiUrl = 'http://localhost:8080/';
const errorMessage = 'ERROR_API_DATA_ERP_SYSTEM: ';

class ApiDataService{
    getOrders(){
        try{
            return axios.get(apiUrl + 'orders', {headers: AuthenticationHeader() });
        }
        catch(error){
            console.log(errorMessage + "Błąd pobierania zleceń: " + error);
            console.error(errorMessage + "Błąd pobierania zleceń: " + error);
        }
    }

    getSpecializations(){
        try{
            return axios.get(apiUrl + 'api/auth/specializations');
        }
        catch(error){
            console.log(errorMessage + "Błąd pobierania stanowisk: " + error);
            console.error(errorMessage + "Błąd pobierania stanowisk: " + error);           
        }
        
    }

    getUsers(){
        try{
            return axios.get(apiUrl + 'api/users', {headers: AuthenticationHeader() });
        }
        catch(error){
            console.log(errorMessage + "Błąd pobierania użytkowników: " + error);
            console.error(errorMessage + "Błąd pobierania użytkowników: " + error);
        }
        
    }

}

export default new ApiDataService();