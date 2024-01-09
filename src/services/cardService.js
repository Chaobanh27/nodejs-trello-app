/*eslint-disable no-console  */
/*eslint-disable no-useless-catch*/
import { StatusCodes } from 'http-status-codes'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    //xử lý logic dữ liệu tùy đặc thù dự án
    const newCard = {
      ...reqBody
    }

    //gọi tới tầng model để lưu bản ghi vào database
    const createdCard = await cardModel.createNew(newCard)
    //gọi tới model để tìm id vừa mới tạo và trả về thông tin mới tạo
    const findOneById = await cardModel.findOneById(createdCard.insertedId)

    //xử lý cấu trúc data ở đây trước khi trả dữ liệu về
    if (findOneById) {
      //update mảng cardOrderIds trong collection columns
      await columnModel.pushCardOrderIds(findOneById)
    }
    //trả về thông tin mới tạo
    return findOneById
  } catch (error) { throw error }
}

const deleteItem = async (cardId) => {
  try {
    const targetCard = await cardModel.findOneById(cardId)
    if (!targetCard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'card not found')
    }
    //xóa card
    await cardModel.deleteOneById(cardId)

    //xóa cardId trong cardOrderIds của column chứa nó
    await columnModel.pullColumnOrderIds(targetCard)

    return { deleteResult: 'Card has been deleted successfully' }
  } catch (error) { throw error }
}

export const cardService = {
  createNew,
  deleteItem
}

