import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger('Create Todo Item')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    logger.info('Processing event: ' + event)
    try {
      const userId = getUserId(event)

      await updateTodo(todoId, updatedTodo, userId)
      return {
        statusCode: 200,
        body: 'todo updated'
      }
    } catch (error) {
      logger.error('Error: ' + error.message)
      return {
        statusCode: 500,
        body: 'An error occured, cannot update todo Item'
      }
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
