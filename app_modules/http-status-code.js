const httpStatusCode = {
    100: {
        statusCode: 100,
        statusMessage: "Continue",
        description: "Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request."
    },
    101: {
        statusCode: 101,
        statusMessage: "Switching Protocols",
        description: "The server switches protocol."
    },
    200: {
        statusCode: 200,
        statusMessage: "OK",
        description: "The request is OK."
    },
    201: {
        statusCode: 201,
        statusMessage: "Created",
        description: "The request is complete, and a new resource is created."
    },
    202: {
        statusCode: 202,
        statusMessage: "Accepted",
        description: "The request is accepted for processing, but the processing is not complete."
    },
    203: {
        statusCode: 203,
        statusMessage: "Non-authoritative Information",
        description: "The information in the entity header is from a local or third-party copy, not from the original server."
    },
    204: {
        statusCode: 204,
        statusMessage: "No Content",
        description: "A status code and a header are given in the response, but there is no entity-body in the reply."
    },
    205: {
        statusCode: 205,
        statusMessage: "Reset Content",
        description: "The browser should clear the form used for this transaction for additional input."
    },
    206: {
        statusCode: 206,
        statusMessage: "Partial Content",
        description: "The server is returning partial data of the size requested. Used in response to a request specifying a Range header. The server must specify the range included in the response with the Content-Range header."
    },
    300: {
        statusCode: 300,
        statusMessage: "Multiple Choices",
        description: "A link list. The user can select a link and go to that location. Maximum five addresses."
    },
    301: {
        statusCode: 301,
        statusMessage: "Moved Permanently",
        description: "The requested page has moved to a new url."
    },
    302: {
        statusCode: 302,
        statusMessage: "Found",
        description: "The requested page has moved temporarily to a new url."
    },
    303: {
        statusCode: 303,
        statusMessage: "See Other",
        description: "The requested page can be found under a different url."
    },
    304: {
        statusCode: 304,
        statusMessage: "Not Modified",
        description: "This is the response code to an If-Modified-Since or If-None-Match header, where the URL has not been modified since the specified date."
    },
    305: {
        statusCode: 305,
        statusMessage: "Use Proxy",
        description: "The requested URL must be accessed through the proxy mentioned in the Location header."
    },
    306: {
        statusCode: 306,
        statusMessage: "Unused",
        description: "This code was used in a previous version. It is no longer used, but the code is reserved."
    },
    307: {
        statusCode: 307,
        statusMessage: "Temporary Redirect",
        description: "The requested page has moved temporarily to a new url."
    },
    400: {
        statusCode: 400,
        statusMessage: "Bad Request",
        description: "The server did not understand the request."
    },
    401: {
        statusCode: 401,
        statusMessage: "Unauthorized",
        description: "The requested page needs a username and a password."
    },
    402: {
        statusCode: 402,
        statusMessage: "Payment Required",
        description: "You can not use this code yet."
    },
    403: {
        statusCode: 403,
        statusMessage: "Forbidden",
        description: "Access is forbidden to the requested page."
    },
    404: {
        statusCode: 404,
        statusMessage: "Not Found",
        description: "The server can not find the requested page."
    },
    405: {
        statusCode: 405,
        statusMessage: "Method Not Allowed",
        description: "The method specified in the request is not allowed."
    },
    406: {
        statusCode: 406,
        statusMessage: "Not Acceptable",
        description: "The server can only generate a response that is not accepted by the client."
    },
    407: {
        statusCode: 407,
        statusMessage: "Proxy Authentication Required",
        description: "You must authenticate with a proxy server before this request can be served."
    },
    408: {
        statusCode: 408,
        statusMessage: "Request Timeout",
        description: "The request took longer than the server was prepared to wait."
    },
    409: {
        statusCode: 409,
        statusMessage: "Conflict",
        description: "The request could not be completed because of a conflict."
    },
    410: {
        statusCode: 410,
        statusMessage: "Gone",
        description: "The requested page is no longer available."
    },
    411: {
        statusCode: 411,
        statusMessage: "Length Required",
        description: "The \"Content-Length\" is not defined. The server will not accept the request without it."
    },
    412: {
        statusCode: 412,
        statusMessage: "Precondition Failed",
        description: "The pre condition given in the request evaluated to false by the server."
    },
    413: {
        statusCode: 413,
        statusMessage: "Request Entity Too Large",
        description: "The server will not accept the request, because the request entity is too large."
    },
    414: {
        statusCode: 414,
        statusMessage: "Request-url Too Long",
        description: "The server will not accept the request, because the url is too long. Occurs when you convert a \"post\" request to a \"get\" request with a long query information."
    },
    415: {
        statusCode: 415,
        statusMessage: "Unsupported Media Type",
        description: "The server will not accept the request, because the mediatype is not supported."
    },
    416: {
        statusCode: 416,
        statusMessage: "Requested Range Not Satisfiable",
        description: "The requested byte range is not available and is out of bounds."
    },
    417: {
        statusCode: 417,
        statusMessage: "Expectation Failed",
        description: "The expectation given in an Expect request-header field could not be met by this server."
    },
    500: {
        statusCode: 500,
        statusMessage: "Internal Server Error",
        description: "The request was not completed. The server met an unexpected condition."
    },
    501: {
        statusCode: 501,
        statusMessage: "Not Implemented",
        description: "The request was not completed. The server did not support the functionality required."
    },
    502: {
        statusCode: 502,
        statusMessage: "Bad Gateway",
        description: "The request was not completed. The server received an invalid response from the upstream server."
    },
    503: {
        statusCode: 503,
        statusMessage: "Service Unavailable",
        description: "The request was not completed. The server is temporarily overloading or down."
    },
    504: {
        statusCode: 504,
        statusMessage: "Gateway Timeout",
        description: "The gateway has timed out."
    },
    505: {
        statusCode: 505,
        statusMessage: "HTTP Version Not Supported",
        description: "The server does not support the \"http protocol\" version."
    }
}

module.exports = httpStatusCode