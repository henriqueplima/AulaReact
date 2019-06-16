const maskCurrency = (value) => {
    
    var newString = 'R$ ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    newString = newString.replace(",", ";");
    newString = newString.replace(".", ",");
    return newString = newString.replace(";", ".");
     
}
export default maskCurrency;