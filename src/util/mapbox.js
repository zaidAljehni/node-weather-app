const request = require( "request" );

const geocode = ( address, callback ) =>
{
    const limit = 5;
    const access_token = "pk.eyJ1IjoibWFyYWgtemF5b3VkIiwiYSI6ImNrcjM3Mzh1aDIxcTEycG54YXB0NnJ0dHYifQ.K4MLqw47cQEUUWk7F5nEzg";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${access_token}&limit=${limit}`;

    const requetObject = { url, json: true };

    request( requetObject, ( error, response ) =>
    {
        if( error )
        {
            callback( "Unable to Connect to Mapbox location services", undefined );
        }
        else if( response.body.features.length === 0 )
        {
            callback( "Unable to find locations. Try another search", undefined );
        }
        else
        {
            // console.log( response.body.features[0].place_name );
            // console.log( response.body.features[0].context );
            // console.log( response.body.features[0].geometry );
    
            const location = response.body.features[0].place_name;
            const latitude = response.body.features[0].geometry.coordinates[1];
            const longitude = response.body.features[0].geometry.coordinates[0];
    
            callback( undefined, {location , latitude, longitude} );
        }
    });
}

module.exports = geocode;