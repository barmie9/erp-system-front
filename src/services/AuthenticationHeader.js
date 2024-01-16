
function AuthenticationHeader() {

    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {

        const authBearer = { Authorization: 'Bearer ' + token };
        return authBearer;
    }
    else {
        console.log("TOKEN NOT EXISTS");
        return {};
    }
}

export default AuthenticationHeader;