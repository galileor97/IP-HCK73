function errorHandler(err, req, res, next) {
    let status = err.status || 500; // This order is important
    let message = err.message || 'Internal Server Error';

    console.error('Error handler caught:', err);

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400;
            message = err.errors[0].message;
            break;
        case 'invalid-token':
        case 'JsonWebTokenError':
            status = 403;
            message = 'UnAuthenticate';
            break;
        case 'Not-Found':
            status = 404;
            message = 'Data not found';
            break;
        case 'Forbidden':
            status = 403;
            message = 'Un Authorize';
            break;
        case 'invalid-data':
            status = 400;
            message = 'File not found';
            break;
        case 'InvalidUser':
            status = 401;
            message = 'Email or Password is incorrect';
            break;
        case 'Invalid-Input':
            status = 400;
            message = 'Email and Password is required';
            break;
    }
    res.status(status).json({ message });
}

module.exports = errorHandler;
