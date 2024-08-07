const { comparePassword } = require('../helper/bcrypt');
const { signToken } = require('../helper/jwt');
const { User } = require('../models/index')



class UserController {

    static async getAllUser(req, res) {
        try {
            let users = await User.findAll()
            res.send(users)
        } catch (error) {
            res.send(error.message)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                throw { name: "Invalid-Input" };
            }

            const user = await User.findOne({
                where: { email },
            })

            if (!user || !comparePassword(password, user.password)) {
                console.log(user);
                throw { name: "InvalidUser" }
            }
            const token = signToken({
                id: user.id
            })
            res.status(201).json({ access_token: token })
        } catch (error) {
            next(error)
        }
    }
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            let user = await User.create({ username, email, password, phoneNumber, address })

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (error) {

            next(error)
        }
    }

}

module.exports = UserController