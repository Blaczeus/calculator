let input = document.getElementById( 'input' );

function deleteLastInput ()
{
    input.value = input.value.slice( 0, -1 );
}

function clearInput ()
{
    input.value = '';
}

function isClicked ( num )
{
    input.value += num;
}

function findKey ( action )
{
    let mtd;
    switch ( action )
    {
        case 'add':
            mtd = ' + ';
            break;
        case 'minus':
            mtd = ' - ';
            break;
        case 'multiply':
            mtd = ' x ';
            break;
        case 'divide':
            mtd = ' / ';
            break;
    }

    if ( input.value )
    {
        input.value += mtd;
    }
}

function solve_equation ()
{
    let expression = input.value;
    clearInput();
    const result = eval( expression.replace( /[^0-9\+\-\*\/]/g, '' ) );
    input.value = result;
}