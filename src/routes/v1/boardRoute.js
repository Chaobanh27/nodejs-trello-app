import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get( (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API get are ready to use' })
  })
  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)

Router.route('/supports/moving_card')
  .get( (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API support is ready to use' })
  })
  .put(boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)

export const boardRoute = Router