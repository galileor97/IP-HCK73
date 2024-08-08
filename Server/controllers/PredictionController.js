const Replicate = require('replicate');
const https = require('https');
const { Image } = require('../models/index')
const cloudinary = require('../helper/cloudinary')

const ReplicateInstance = new Replicate();

const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const data = [];
            response.on('data', (chunk) => {
                data.push(chunk);
            });
            response.on('end', () => {
                resolve(Buffer.concat(data));
            });
            response.on('error', (err) => {
                reject(err);
            });
        });
    });
};

class PredictionController {


    static async createPrediction(req, res, next) {

        try {
            // console.log('Request files:', req.files);
            const { id } = req.user;
            const { base_image, style_image, identity_image, composition_image } = req.files;

            if (!base_image || !style_image || !identity_image || !composition_image) {
                return res.status(400).json({ message: 'All image fields are required.' });
            }


            const base64Images = [base_image[0], style_image[0], identity_image[0], composition_image[0]].map((file) => {
                return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            });

            const inputData = {
                base_image: base64Images[0],
                style_image: base64Images[1],
                identity_image: base64Images[2],
                composition_image: base64Images[3],
            };


            const output = await ReplicateInstance.run(
                "okaris/omni-zero:1a6dcacf62f387316745e91928dec9d59412b6d0518647fdb0f52e6f40b6a46c",
                { input: inputData }
            );

            const outputUrl = output[0];


            const imageBuffer = await downloadImage(outputUrl);


            const cloudinaryUpload = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
                uploadStream.end(imageBuffer);
            });


            // console.log(imageUrl);
            const newImage = await Image.create({
                imageUrl: cloudinaryUpload.secure_url,
                userId: id,
            });

            res.status(200).json({
                prediction: output,
                cloudinaryUrl: newImage.imageUrl,
            });
        } catch (error) {
            next(error)
            res.status(500).json({ error: error.message });
        }
    }

    static async generateImage(req, res) {
        try {
            const input = {
                base_image: "https://github.com/okaris/omni-zero/assets/1448702/2ca63443-c7f3-4ba6-95c1-2a341414865f",
                style_image: "https://github.com/okaris/omni-zero/assets/1448702/64dc150b-f683-41b1-be23-b6a52c771584",
                identity_image: "https://github.com/okaris/omni-zero/assets/1448702/ba193a3a-f90e-4461-848a-560454531c58",
                composition_image: "https://github.com/okaris/omni-zero/assets/1448702/2ca63443-c7f3-4ba6-95c1-2a341414865f"
            };

            const output = await ReplicateInstance.run("okaris/omni-zero:1a6dcacf62f387316745e91928dec9d59412b6d0518647fdb0f52e6f40b6a46c", { input });
            console.log(output)
            res.status(200).json({ output })
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = PredictionController