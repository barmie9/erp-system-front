function AuthenticationHeader(){
    const token = JSON.parse(localStorage.getItem('token'));

    if(token && token.accessToken){
        return {Authorization: 'Bearer' + token.accessToken};
    }
    else{
        return {}; //Do przemyslenia
    }
}

export default AuthenticationHeader;