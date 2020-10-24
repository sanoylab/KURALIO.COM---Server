const express = require('express')
const path = require('path')
const cors = require('cors')

require('./db/connection')
require('dotenv').config()
const errors = require('./error-middleware')
const PORT = process.env.PORT 

//Routers
//const userRouter = require('./routers/user')
//const categoryRouter = require('./routers/category')
//const adRouter = require('./routers/ad')
//const messageRouter = require('./routers/message')

const router =  require('./routers/index');




const app = express()

//App level middlewares
app.use(cors())
app.use(express.json());
app.use('/api/v1', router);

//app.use(userRouter)
//app.use(categoryRouter)
//app.use(adRouter)
//app.use(messageRouter)


/*
app.get('/api/v1/', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"))
})
*/

app.use(errors.notFound)
app.use(errors.errorHandler)



app.listen(PORT, ()=>{
    console.log(`Server is started on port ${PORT}`)
})

