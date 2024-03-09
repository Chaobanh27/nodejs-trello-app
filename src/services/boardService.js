/*eslint-disable no-console  */
/*eslint-disable no-useless-catch*/
// import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { formattedTime } from '~/utils/TimeFormat'

const createNew = async (reqBody) => {
  try {
    //xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody
      //slug: slugify(reqBody.title)
    }

    //gọi tới tầng model để lưu bản ghi vào database
    const createdBoard = await boardModel.createNew(newBoard)
    //gọi tới model để tìm id vừa mới tạo và trả về thông tin mới tạo
    const findOneById = await boardModel.findOneById(createdBoard.insertedId)
    //trả về thông tin mới tạo
    return findOneById
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    //gọi tới model để tìm id vừa mới tạo và trả về thông tin mới tạo
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found! ')
    }

    const resBoard = cloneDeep(board)
    console.log(resBoard)

    //đưa card thuộc về column của nó
    resBoard.columns.forEach((column) => {
      //column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })

    //xóa mảng cards khỏi board ban đầu
    delete resBoard.cards

    //trả về thông tin mới tạo
    return resBoard
  } catch (error) { throw error }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: formattedTime(Date.now())
    }
    const updatedBoard = await boardModel.updateColumnOrderIds(boardId, updateData)

    return updatedBoard
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
  // B1 : cập nhật mảng cardOrderIds của column ban đầu chứa nó ( xóa cái id của card đó ra khỏi mảng )
    await columnModel.updateCardOrderIds(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: formattedTime(Date.now())
    })
    // B2 : cập nhật mảng cardOrderIds của column tiếp theo ( thêm id của card đó vào mảng )
    await columnModel.updateCardOrderIds(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: formattedTime(Date.now())
    })
    // B3 : cập nhật lại trường columnId mới của card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })
    return { updateResult: 'Successfully' }
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}

