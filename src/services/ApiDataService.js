import axios from "axios";
import AuthenticationHeader from "./AuthenticationHeader";

const apiUrl = 'http://localhost:8080/';
const errorMessage = 'ERROR_API_DATA_ERP_SYSTEM: ';

class ApiDataService{
    getOrders(){
        try{
            return axios.get(apiUrl + 'api/orders', {headers: AuthenticationHeader() });
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

    getCompanyOrder(){
        return axios.get(apiUrl + 'api/companyorders',{headers: AuthenticationHeader() });
    }

    addOrder(name,quantity,createDate,expectDate,realDate,orderManagerId,companyOrderId){
        return axios.post(apiUrl + 'api/addorder',{
            name,quantity,createDate,expectDate,realDate,orderManagerId,companyOrderId},
            {headers: AuthenticationHeader() });
    }

    getTasksByOrderId(orderId){
        return axios.post(apiUrl + 'api/tasks',{orderId},{headers: AuthenticationHeader() });
    }

    addTask(name,descr,startDate,endDate,userId,orderId){
        return axios.post(apiUrl + 'api/add-task',{name,descr,startDate,endDate,userId,orderId} ,
        {headers: AuthenticationHeader() });
    }

    editOrder(id,name,quantity,companyOrderId,expectDate){
        return axios.post(apiUrl + 'api/order-edit',{id,name,quantity,companyOrderId,expectDate},
        {headers: AuthenticationHeader() });
    }

    getOrderById(id){
        return axios.post(apiUrl + 'api/order', {id},
        {headers: AuthenticationHeader() });
    }


}

export default new ApiDataService();