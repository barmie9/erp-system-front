import axios from 'axios';
import AuthenticationHeader from './AuthenticationHeader';

const apiUrl = 'http://localhost:8080/';

class AuthenticationService{

    login(username,password){
        const loginPayload = {
            email: username,
            password: password
          }

        return axios.post(apiUrl + 'api/auth/login',loginPayload)
        .then(response => {
            if(response.data.token){
                // const  token = JSON.stringify(response.data.token);
                const  token = JSON.stringify(response.data)
                // localStorage.setItem('token',JSON.stringify(response.data));
                console.log("TOKEN: ", token);
                localStorage.setItem('token',token);
                // console.log("TOKEN2: ", localStorage.getItem('token') );
                console.log("TOKEN2: ", JSON.parse(localStorage.getItem('token')).token );
            }
            // return response.data;
        })
        .catch(err => console.log(err));
    }

    logout(){
        localStorage.removeItem('token');
    }

    register(name,surname,email,password,phoneNum,pesel,dateOfBirthday,specId){
        return axios.post(apiUrl + 'api/auth/register',{
            name,surname,email,password,phoneNum,pesel,dateOfBirthday,specId
        })
        .then(response => {
            if(response.data.token){
                localStorage.setItem('token',JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    getCurrentToken(){
        return JSON.parse(localStorage.getItem('token'));
    }
}

export default new AuthenticationService();