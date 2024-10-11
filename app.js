let calculatorDisplay = document.getElementById( 'calculatorDisplay' );
let isResultDisplayed = false;
let store = [];

function deleteLastChar ()
{
    if ( calculatorDisplay.value.length <= 1 )
    {
        clearDisplay();
    }
    calculatorDisplay.value = calculatorDisplay.value.slice( 0, -1 );
}

function clearDisplay ()
{
    calculatorDisplay.value = '';
    isResultDisplayed = false;
}

function handleKeyPress ( key )
{
    let operators = [ '+', '-', '*', '/' ];
    let lastChar = calculatorDisplay.value.slice( -1 );

    if ( isResultDisplayed && !isNaN( key ) && !operators.includes( lastChar ) )
    {
        return
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

function saveResult ( result )
{
    store.push( result );
    if ( store.length > 10 )
    {
        store.shift();
    }
    localStorage.setItem( 'storedResult', JSON.stringify( store ) );
    getStoredResult();
}

function getStoredResult ()
{
    let storedResult = JSON.parse( localStorage.getItem( 'storedResult' ) );
    if ( storedResult )
    {
        store = storedResult;
        let result = store[ store.length - 1 ];
        calculatorDisplay.value = result;
        isResultDisplayed = true;
    } else
    {
        clearDisplay();        
    }
}

function clearMemory ()
{
    store = [];
    localStorage.removeItem( 'storedResult' );
    clearDisplay();
}


function calculateResult ()
{
    let operators = [ '+', '-', '*', '/' ];
    let lastChar = calculatorDisplay.value.slice( -1 );

    if ( operators.includes( lastChar ) && !isResultDisplayed )
    {
        return;
    }

    let expression = calculatorDisplay.value;
    try
    {
        const result = eval( expression.replace( /[^0-9\+\-\*\/\.]/g, '' ) );
        saveResult( result );
        // isResultDisplayed = true;
    } catch ( error )
    {
        calculatorDisplay.value = "Error";
    }
}

document.addEventListener( 'keydown', function ( event )
{
    let key = event.key;
    let operators = [ '+', '-', '/', '*', '.' ];

    if ( !isNaN( key ) || operators.includes( key ) )
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

    if ( key === 'Escape' || key.toLowerCase === 'c' || key === 'Delete' )
    {
        clearDisplay();
    }
} );