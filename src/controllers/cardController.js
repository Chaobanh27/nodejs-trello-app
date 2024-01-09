import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {

    //Điều hướng dữ liệu sang tầng service
    const createdCard = await cardService.createNew(req.body)

    //có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    //console.log( 'req.params:' + req.params)
    const cardId = req.params.id
    //Điều hướng dữ liệu sang tầng service
    const updatedColumn = await cardService.deleteItem(cardId)
    //có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}


export const cardController = {
  createNew,
  deleteItem
}