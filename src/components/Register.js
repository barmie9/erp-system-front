import React, { useEffect, useState } from "react";

//npm install react-datepicker --save
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//npm install react-select
import Select from "react-select";
import ApiDataService from "../services/ApiDataService";

function Register() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [phonNum,setPhonNum] = useState('');
    const [pesel,setPesel] = useState('');
    
    const [datePicker,setDatePicker] = useState(null);
    const [specId,setSpecId] = useState(null);
    const [specStr, setSpecStr] = useState(null);
    const [specOptions,setSpecOptions] = useState([]);

    useEffect(  () =>{
         fetchSpecializations();
    },[]);

    function formatDate() {
            var month = '' + (datePicker.getMonth() + 1);
            var day = '' + datePicker.getDate();
            var year = datePicker.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Zatrzymania domyślnego zachowania przeglądarki. W kontekście formularza, domyślne zachowanie polega na przesłaniu danych formularza i przeładowaniu strony.
        
        // Todo Do napisania POST do back-endu
        console.log("DATA: \n" , 
        formatDate() + '\n',
        email + '\n',
        password + '\n',
        name + '\n',
        surname + '\n',
        phonNum + '\n',
        pesel + '\n',
        specId,
        );
    }

    const handleDataPicker = (date) => {
        setDatePicker(date);
    }

    const setSpec = (selectedOption) =>{
        setSpecId(selectedOption.value);
        setSpecStr(selectedOption);

    }


      const fetchSpecializations = async () => {
        const data = await ApiDataService.getSpecializations();

        // console.log("DATA: ",data.data);

        var options = [] ;
        data.data.map(element => {
            options.push({label: element.name, value: element.id});
        });
        setSpecOptions(options);

        // console.log("OPTIONS: ",options);
    }

    

    return(
        <div id="loginform" className="form">
            <h1>Rejestracja</h1>
            <form>
                <div className="custom-input-container">
                    <input  placeholder="Imie" className="custom-input" onChange={ (e) => {setName(e.target.value)} } value={name} type="text" />
                </div>
                <div className="custom-input-container">
                    <input  placeholder="Nazwisko" className="custom-input" onChange={ (e) => {setSurname(e.target.value)} } value={surname} type="text" />
                </div>
                <div className="custom-input-container">
                    <input  placeholder="Email" className="custom-input" onChange={ (e) => {setEmail(e.target.value)} } value={email} type="email" name="email"/>
                </div>
                <div className="custom-input-container">
                    <input placeholder="Hasło" className="custom-input" onChange={ (e) => {setPassword(e.target.value)} } value={password} type="password" name="password" />
                </div>
                <div className="custom-input-container">
                    <input  placeholder="Numer telefonu" className="custom-input" onChange={ (e) => {setPhonNum(e.target.value)} } value={phonNum} type="text" />
                </div>
                <div className="custom-input-container">
                    <input  placeholder="Numer PESEL" className="custom-input" onChange={ (e) => {setPesel(e.target.value)} } value={pesel} type="text" />
                </div>
            
                <div className="custom-input-container">
  
                    <DatePicker 
                        onChange={handleDataPicker} 
                        placeholderText={'Data Urodzenia (yyyy-MM-dd)'} 
                        selected={datePicker} 
                        dateFormat="yyyy-MM-dd"
                        showYearDropdown
                        yearDropdownItemNumber={150} // Określa ilość lat wyświetlanych na liście rozwijanej
                        scrollableYearDropdown // Pozwala na przewijanie listy rozwijanej lat
                        maxDate={new Date() } // Ustala maksymalną datę na dzisiejszą datę
                        className="custom-input"
                    />
                </div>


                <div className="custom-input-container">
                    <Select
                        value={specStr}
                        onChange={setSpec}
                        options={specOptions}
                        isSearchable
                        placeholder="Stanowisko..."
                        // className="custom-input"
                    />
                </div>
                    
                <div><button className="button" type="submit" onClick={handleSubmit}>Zarejestruj</button></div>

            </form>
        </div>
    );
}

export default Register;