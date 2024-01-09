/*eslint-disable no-console  */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    //console.log( 'req.body:' + req.body)
    // console.log( 'req.query:' + req.query)
    // console.log( 'req.params:' + req.params)
    // console.log( 'req.files:' + req.files)
    // console.log( 'req.cookies:' + req.cookies)
    // console.log( 'req.jwtDecoded:' + req.jwtDecode)

    //Điều hướng dữ liệu sang tầng service
    const createdBoard = await boardService.createNew(req.body)

    //có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    // console.log( 'req.params:' + req.params)
    const boardId = req.params.id
    //Điều hướng dữ liệu sang tầng service
    const board = await boardService.getDetails(boardId)
    //có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    // console.log( 'req.params:' + req.params)
    const boardId = req.params.id
    //Điều hướng dữ liệu sang tầng service
    const updatedBoard = await boardService.update(boardId, req.body)
    //có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang tầng service
    const result= await boardService.moveCardToDifferentColumn(req.body)
    console.log(result)
    //có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}