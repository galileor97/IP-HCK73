const { Image } = require('../models/index')


class ImageController {

    static async deleteImage(req, res, next) {
        try {
            let { id } = req.params
            let image = await Image.findByPk(id)

            if (!image) {
                throw { name: 'Not-Found' }
            }
            await Image.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).json({ message: `Image with id ${id} successfully deleted` })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async findImageByPk(req, res, next) {
        try {
            let { id } = req.params
            let image = await Image.findByPk(id)

            if (!image) {
                throw { name: 'Not-Found' }
            }
            res.status(200).json({ image })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ImageController