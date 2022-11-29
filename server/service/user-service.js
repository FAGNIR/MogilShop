const ApiError = require('../error/ApiError')
const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

class UserService{
    async registration(email, password, role){

        const candidate = await User.findOne({where: {email}})
        if(candidate){
            throw ApiError.badRequest("Пользователь с таким email уже существует")
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()

        const user = await User.create({email, role, password: hashPassword, activationLink})
        const basket = await Basket.create({userId: user.id})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    
    async activate(activationLink){
        const user = await User.findOne({where: {activationLink: activationLink}})
        if(user === null)
        {
            throw ApiError.badRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({where: {email: email}})
        if(!user){
            throw ApiError.badRequest('Пользователь не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.badRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id)//
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async getAllUsers(){
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();