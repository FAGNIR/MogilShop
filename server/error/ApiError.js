class ApiError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
    static badRequest(message, errors = []){
        return new ApiError(400, message, errors);
    }
    static internal(message){
        return new ApiError(500, message);
    }
    static forbiden(message){
        return new ApiError(403, message);
    }
    static UnauthorizedError(){
        return new ApiError(401, 'Пользователь не авторизован');
    }
    static RoleError(){
        return new ApiError(401, 'Не имеет доступа к данному функционалу');
    }
    
}

module.exports = ApiError;