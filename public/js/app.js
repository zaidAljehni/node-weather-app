console.log( "Client-Side JavaScript" );

const locationForm = document.querySelector( "form" );
const locationInput = document.querySelector( "input" );

const forecastParagraph = document.querySelector( "#forecast" );
const errorParagraph = document.querySelector( "#error" );

locationForm.addEventListener( "submit", (event) =>
{
    event.preventDefault();

    const location = locationInput.value;

    forecastParagraph.textContent = "Loading...";
    errorParagraph.textContent = "";

    fetch( `http://localhost:4000/weather?address=${location}` )
    .then( (response) => { return response.json() } )
    .then( (parsedData) => 
    { 
        console.log( parsedData );
        
        if( parsedData.geocodeError )
        {
            forecastParagraph.textContent = "";
            errorParagraph.textContent = parsedData.geocodeError;
        }
        else
        {
            forecastParagraph.textContent = `Location: ${parsedData.location}\tLocal Time: ${parsedData.localtime}\nTemperature: ${parsedData.temperature}\tFeels like: ${parsedData.feelslike}\tWeather: ${parsedData.weather_description}`;
        }
        
        
    } )
    .catch( (error) => { console.log( error ); } )
} );