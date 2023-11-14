import axios from 'axios';

const apiUrl = 'http://localhost:8080/';

class AuthenticationService{

    login(username,password){
        const loginPayload = {
            email: username,
            password: password
          }

        return axios.post(apiUrl + 'api/auth/login',loginPayload)
        .then(response => {
            if(response.data && response.data.token){
                const  token = JSON.stringify(response.data.token);
                const role = JSON.stringify(response.data.role);
                const userId = JSON.stringify(response.data.userId);

                console.log("TOKEN/ROLE/userId: ", token + '/' + role + '/' + userId);

                localStorage.setItem('token',token);
                localStorage.setItem('role',role);
                localStorage.setItem('userId',userId);
            }
        })
        .catch(err => console.log(err));
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.setItem("role",null);

        window.location.reload();
    }

    register(name,surname,email,password,phoneNum,pesel,dateOfBirthday,specId){
        return axios.post(apiUrl + 'api/auth/register',{
            name,surname,email,password,phoneNum,pesel,dateOfBirthday,specId
        })
        .then(response => {
            if(response.data.token && response.data.role){
                const  token = JSON.stringify(response.data.token);
                const role = JSON.stringify(response.data.role);

                localStorage.setItem('token',token);
                localStorage.setItem('role',role);
            }
            return response.data;
        });
    }

    getCurrentToken(){
        return JSON.parse(localStorage.getItem('token'));
    }
}

export default new AuthenticationService();