import { userService } from '../service/userService.js';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiError.js';

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error during validation', errors.array()));

            }
            const {email, password, username} = req.body;
            const userData = await userService.registration(email, password, username);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
// admin actions
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async updateUserRole(req, res, next) {
        try {
            const { userId, newRole } = req.body;
            const updateUser = await userService.updateUserRole(userId, newRole);
            return res.json(updateUser);
        } catch (error) {
            next(error)
        }
    }
    
    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            const deleteUserRes = await userService.deleteUser(userId);
            return res.json(deleteUserRes);
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController();

