
function AuthenticationHeader(){
    // const token = JSON.parse(localStorage.getItem('token'));
    // const token = localStorage.getItem('token');
    const token = JSON.parse(localStorage.getItem('token'));

    // if(token )
    if(token ){
        
        const authBearer = {Authorization: 'Bearer ' + token.token};
        console.log("TOKEN EXISTS", authBearer.Authorization);
        return authBearer;
    }
    else{
        console.log("TOKEN NOT EXISTS");
        return {}; //Do przemyslenia
    }
}

export default AuthenticationHeader;