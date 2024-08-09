if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()

const router = require('./routes')



app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }))

app.use(router)

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app