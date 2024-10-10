let input = document.getElementById( 'input' );
let isResultDisplayed = false;

function deleteLastInput ()
{
    input.value = input.value.slice( 0, -1 );
}

function clearInput ()
{
    input.value = '';
}

function isClicked ( key )
{
    let operators = [ '+', '-', '*', '/' ];
    let lastChar = input.value.slice( -1 );

    if ( isResultDisplayed && !operators.includes( key ) )
    {
        clearInput();
        isResultDisplayed = false;
    }
    if ( operators.includes( lastChar ) && operators.includes( key ) )
    {
        return;
    }

    let lastNumber = input.value.split( /[\+\-\*\/]/ ).pop();
    if ( key === '.' && lastNumber.includes( '.' ) )
    {
        return;
    }

    input.value += key;
}


function solve_equation ()
{
    let operators = [ '+', '-', '*', '/' ];
    let lastChar = input.value.slice( -1 );

    if ( operators.includes( lastChar ))
    {
        return;
    }

    let expression = input.value;
    try
    {
        const result = eval( expression.replace( /[^0-9\+\-\*\/\.]/g, '' ) );
        clearInput();
        
        input.value = result;

        isResultDisplayed = true;
    } catch ( error )
    {
        input.value = "Error";
    }
}

document.addEventListener( 'keydown', function ( event )
{
    let key = event.key;
    let operators = [ '+', '-', '/', '*', '.'];

    if ( !isNaN( key ) || operators.includes(key))
    {
        isClicked( key );
    }

    if ( key === 'Enter' )
    {
        solve_equation();
    }

    if ( key === 'Backspace' )
    {
        deleteLastInput();
    }

    if ( key === 'Escape' || key.toLowerCase === 'c'  || key === 'Delete')
    {
        clearInput();
    }
} );