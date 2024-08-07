const { Image } = require("../models");

async function isAuthorized(req, res, next) {
    try {
        const { id } = req.params
        console.log(id,'darii authorirez');
        let image = await Image.findByPk(req.params.id);

        if (!image) {
            throw { name: "Not-Found" }
        }

        if (image.userId !== req.user.id) {
            throw { name: "Forbidden" }
        }
        next()
    } catch (error) {

        next(error)
    }
}


module.exports = { isAuthorized }