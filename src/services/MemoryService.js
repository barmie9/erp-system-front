
export function getUserIdFromMemory(){
    return JSON.parse(localStorage.getItem('userId'));
}

export function getRoleFromMemory(){
    return JSON.parse(localStorage.getItem('role'));
}