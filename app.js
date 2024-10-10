let input = document.getElementById( 'input' );

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
    let expression = input.value;
    const result = eval( expression.replace( /[^0-9\+\-\*\/]/g, '' ) );
    clearInput();
    input.value = result;
    
}