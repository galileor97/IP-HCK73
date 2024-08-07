class PredictionController {


    static async createPrediction(req, res, next) {
        try {
            const { id } = req.user
            const { base_image, style_image, identity_image, composition_image } = req.files;

            // console.log({ id, imageUrl });

            const base64Images = await Promise.all([
                base_image,
                style_image,
                identity_image,
                composition_image,
              ].map(async (file) => {
                const data = await fs.promises.readFile(file.path);
                return `data:${file.mimetype};base64,${data.toString('base64')}`;
              }));

              const inputData = {
                base_image: base64Images[0],
                style_image: base64Images[1],
                identity_image: base64Images[2],
                composition_image: base64Images[3], // Adjust if needed
              };

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = PredictionController