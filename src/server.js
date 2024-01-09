/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment.js'
import { APIs_V1 } from '~/routes/v1/index'
import { StatusCodes } from 'http-status-codes'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const port = env.APP_PORT
const host = env.APP_HOST

const START_SERVER = () => {
  const app = express()

  app.use(cors())
  //enable req.body json data
  app.use(express.json())

  //User APIs V1
  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  //Middleware xử lý lỗi tập trung
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something broke!')
  })

  app.get('/', (req, res) => {
    //console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello Chaobanh!</h1>')
  })
  app.listen(port, host, () => {
    console.log(`Hello Chaobanh, I am running at http://${ host }:${ port }/`)
  })
}

//chỉ khi kết nối DB thành công thì mới khởi chạy server back-end
(async() => {
  try {
    console.log('1. Connecting to MongoDB CLoud Atlas...')
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas')
    START_SERVER()
  }
  catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => {
//     console.log('Connected to MongoDB Cloud Atlas')
//   })
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(error)
//     process.exit(0)
//   })