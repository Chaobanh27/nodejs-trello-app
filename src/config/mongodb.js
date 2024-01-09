import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment.js'

//khởi tạo đối tượng mongoDbInstance ban đầu là null (vì chưa connect)
let mongdoDbInstance = null

//khởi tạo đối tượng mongoClientInstance để connect tới MongoDb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //serverApichỉ có từ phiên bản 5.0 trở lên,chúng ta có thể không dùng nhưng nếu dùng thì serverApi sẽ chỉ định một Stable Api version của MongoDb
  // https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  //gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân mongoClientInstance
  await mongoClientInstance.connect()

  //kết nối thành công thì lấy ra DB theo tên và gán ngược lại nó vào biến mongdoDbInstance ở trên
  mongdoDbInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//function GET_DB cos nhiệm vụ export ra cái mongdoDbInstance sau khi đã connect thành công tới MongoDB
//để chúng ta có thể sử dụng ở nhiều nơi khác trong project
//chỉ luôn gọi GET_DB này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!mongdoDbInstance) throw new Error('Must connect to Database first')
  return mongdoDbInstance
}