const request = require( "request" );

const forecast = ( address, callback ) =>
{
    const access_key = "0bcc624dd8fe7af4166389ccaaa808d0";
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${address.latitude},${address.longitude}`;


    const requetObject = { url, json: true };

    request( requetObject, ( error, response ) =>
    {
        if( error )
        {
            callback( "Unable to Connect to Weather Stack weather services", undefined );
        }
        else if( response.body.error )
        {
            callback( "Unable to find weather. Try another search", undefined );
        }
        else
        {
            console.log( response.body );
    
            let { temperature, feelslike, weather_descriptions } = response.body.current;
            let localtime = response.body.location;
    
            callback( undefined, { localtime, 
                temperature , 
                feelslike, 
                weather_description: weather_descriptions[0] } );
        }
    });
}

module.exports = forecast;