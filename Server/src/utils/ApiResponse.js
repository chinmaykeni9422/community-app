class ApiResponse {
    constructor(statusCode, data = null, message = "", errors = []) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.errors = errors;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

export default ApiResponse;