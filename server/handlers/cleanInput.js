//A simple user input cleaning function to remove non-alphanumeric characters

function cleanInput(input){
    return String(input).replace(/\W/g,'')
}

module.exports = cleanInput 