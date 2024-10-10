let calculatorDisplay = document.getElementById( 'calculatorDisplay' );
let isResultDisplayed = false;

function deleteLastChar ()
{
    calculatorDisplay.value = calculatorDisplay.value.slice( 0, -1 );
}

function clearDisplay ()
{
    calculatorDisplay.value = '';
}

function handleKeyPress( key )
{
    let operators = [ '+', '-', '*', '/' ];
    let lastChar = calculatorDisplay.value.slice( -1 );

    if ( isResultDisplayed && !operators.includes( key ) )
    {
        clearDisplay();
        isResultDisplayed = false;
    }
    if ( operators.includes( lastChar ) && operators.includes( key ) )
    {
        return;
    }

    let lastNumber = calculatorDisplay.value.split( /[\+\-\*\/]/ ).pop();
    if ( key === '.' && lastNumber.includes( '.' ) )
    {
        return;
    }

    calculatorDisplay.value += key;
}


function calculateResult ()
{
    let operators = [ '+', '-', '*', '/' ];
    let lastChar = calculatorDisplay.value.slice( -1 );

    if ( operators.includes( lastChar ))
    {
        return;
    }

    let expression = calculatorDisplay.value;
    try
    {
        const result = eval( expression.replace( /[^0-9\+\-\*\/\.]/g, '' ) );
        clearDisplay();
        
        calculatorDisplay.value = result;

        isResultDisplayed = true;
    } catch ( error )
    {
        calculatorDisplay.value = "Error";
    }
}

document.addEventListener( 'keydown', function ( event )
{
    let key = event.key;
    let operators = [ '+', '-', '/', '*', '.'];

    if ( !isNaN( key ) || operators.includes(key))
    {
        handleKeyPress( key );
    }

    if ( key === 'Enter' )
    {
        calculateResult();
    }

    if ( key === 'Backspace' )
    {
        deleteLastChar();
    }

    if ( key === 'Escape' || key.toLowerCase === 'c'  || key === 'Delete')
    {
        clearDisplay();
    }
} );