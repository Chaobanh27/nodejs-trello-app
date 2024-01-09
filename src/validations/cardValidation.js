/*eslint-disable no-console  */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    //console.log( 'req.body:' + req.body)

    await correctCondition.validateAsync(req.body, { abortEarly: false })

    //validate dữ liệu xong hợp lệ thì cho request đi tiếp sang Controller
    next()

    //res.status(StatusCodes.CREATED).json({ message: 'API post from validation is ready to use' })
  }
  catch (error)
  {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    //đối với trường hợp update cho phép unknow để không cần đẩy 1 số field lên
    await correctCondition.validateAsync(req.params)
    next()

  }
  catch (error)
  {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const cardValidation = {
  createNew,
  deleteItem
}

