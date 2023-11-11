import axios from 'axios';

const apiUrl = 'http://localhost:8080/';

class AuthenticationService{
    
    login(username,password){
        return axios.post(apiUrl + 'signin',{
            username,password
        })
        .then(response => {
            if(response.data.accessToken){
                localStorage.setItem('token',JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout(){
        localStorage.removeItem('token');
    }

    getCurrentToken(){
        return JSON.parse(localStorage.getItem('token'));
    }
}

export default new AuthenticationService();