export function checkFields(fields) {
    const ret_val = fields.every((item) => item !== null && item !== "");
    if (ret_val) {
        return true;
    }
    else {
        alert("Uzupełnij wszystkie wymagane pola !");
        return false;
    }


    return
}