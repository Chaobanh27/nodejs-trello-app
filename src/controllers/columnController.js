import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {

    //Điều hướng dữ liệu sang tầng service
    const createdColumn = await columnService.createNew(req.body)

    //có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    //console.log( 'req.params:' + req.params)
    const columnId = req.params.id
    //Điều hướng dữ liệu sang tầng service
    const updatedColumn = await columnService.update(columnId, req.body)
    //có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    //console.log( 'req.params:' + req.params)
    const columnId = req.params.id
    //Điều hướng dữ liệu sang tầng service
    const updatedColumn = await columnService.deleteItem(columnId)
    //có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  update,
  deleteItem
}