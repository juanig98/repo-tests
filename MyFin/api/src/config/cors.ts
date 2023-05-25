const whitelist: string[] =
    [
        'http://localhost:3000',
        'http://localhost:4200'
    ];


export const cors = {

    options: {
        origin: function (origin: string, callback: any) {
           return callback(null, true);
            (whitelist.indexOf(origin) !== -1) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
        }
    }
}