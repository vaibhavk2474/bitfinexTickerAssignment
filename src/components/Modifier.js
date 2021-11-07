
function Modifier(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

// function modify(number) {
//     const givenNumber = number;

//    let  internationalNumberFormat = new Intl.NumberFormat('en-US')

//     return internationalNumberFormat.format(givenNumber)
    
// }

export default Modifier;