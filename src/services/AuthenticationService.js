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

                console.log("TOKEN/ROLE: ", token + '/' +role);

                localStorage.setItem('token',token);
                localStorage.setItem('role',role);
            }
        })
        .catch(err => console.log(err));
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.setItem("role",null);

        // console.log("LOGOUT !! RELOAD");
        window.location.reload();
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