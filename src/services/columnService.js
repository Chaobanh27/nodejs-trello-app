/*eslint-disable no-console  */
/*eslint-disable no-useless-catch*/
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { formattedTime } from '~/utils/TimeFormat'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    //xử lý logic dữ liệu tùy đặc thù dự án
    const newColumn = {
      ...reqBody
    }

    //gọi tới tầng model để lưu bản ghi vào database
    const createdColumn = await columnModel.createNew(newColumn)
    //gọi tới model để tìm id vừa mới tạo và trả về thông tin mới tạo
    const findOneById = await columnModel.findOneById(createdColumn.insertedId)

    //xử lý cấu trúc data ở đây trước khi trả dữ liệu về
    if (findOneById) {
      findOneById.cards = []

      //update mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(findOneById)
    }
    //trả về thông tin mới tạo
    return findOneById
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: formattedTime(Date.now())
    }
    const updatedColumn = await columnModel.updateCardOrderIds(columnId, updateData)

    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }
    //xóa Column
    await columnModel.deleteOneById(columnId)

    //xóa cards của column đó
    await cardModel.deleteManyByColumnId(columnId)

    //xóa columnId trong columnOrderIds của board chứa nó
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its Cards have been deleted successfully' }
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}

