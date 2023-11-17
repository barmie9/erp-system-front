
// -------- Konwertuje date z formatu "yyyy-MM-dd" na nowy obiekt typu Date --------
export  function formatDate (inputDate){
    const parts = inputDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Miesiące są liczone od 0 do 11 w obiekcie Date
    const day = parseInt(parts[2], 10);
  
    const formattedDate = new Date(year, month, day);
    return formattedDate;
  };


  // -------- Konwertuje date z formatu Date na String w formacie "yyyy-MM-dd" --------
  export  function formatDateToStr(date) {
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [year, month, day].join('-');
}