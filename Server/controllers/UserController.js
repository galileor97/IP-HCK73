const { comparePassword } = require('../helper/bcrypt');
const { signToken, verifyToken } = require('../helper/jwt');
const { User } = require('../models/index')
const jwt = require('jsonwebtoken');


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class UserController {

    static async editPhoto(req, res, next) {
        try {
            const { id } = req.user
            const { photoUrl } = req.body
            // console.log(id, photoUrl);
            let user = await User.findByPk(+id)
            await user.update({ photo: photoUrl });
            res.status(200).json({ message: "Profile photo updated successfully", user });
        } catch (error) {
            res.send(error.message)
            next(error)
        }
    }

    static async getAllUser(req, res, next) {
        try {
            let users = await User.findAll()
            res.send(users)
        } catch (error) {
            res.send(error.message)
            next(error)
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.user
            let user = await User.findByPk(+id)

            res.status(201).json({ user })
        } catch (error) {
            console.log(error);
            next(error)
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
            const { username, email, password } = req.body
            let user = await User.create({ username, email, password })

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (error) {

            next(error)
        }
    }

    static async googleAuth(req, res) {
        const { googleToken } = req.body;

        try {
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {

                    username: payload.name,
                    email: payload.email,
                    photo: payload.picture,
                    provider: 'google',
                    password: 'google_id'
                },
                hooks: false
            });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
            res.status(created ? 201 : 200).json({ access_token: token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = UserController