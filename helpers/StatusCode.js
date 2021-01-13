
const sendOk = (body = null, message = null) => {

    const response = {
        'status': 200,
        'message': (message) ? message : 'Ok'
    }

    if (body !== null) {
        response.data = body;
    }

    return response;
}

const notFound = (data = null, message = null) => {

    const response = {
        'status': 404,
        'message': (message) ? message : 'Not Found'
    }

    if (data !== null) {
        response.data = data
    }

    return response;
}

const forBidden = (data = null, message = null) => {

    const response = {
        'status': 403,
        'message': (message) ? message : 'Forbidden Access!'
    }

    if (data !== null) {
        response.data = data
    }

    return response;
}

const error = (data = null, message = null) => {

    const response = {
        'status': 500,
        'message': (message) ? message : 'Error occured!'
    }

    if (data !== null) {
        response.data = data
    }

    return response;
}

module.exports = {
    sendOk,
    notFound,
    forBidden,
    error
}