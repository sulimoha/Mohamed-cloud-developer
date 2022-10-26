import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger('Delete Todo Item')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ' + event)
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id

    try {
      const userId = getUserId(event)
      await deleteTodo(todoId, userId)
      return {
        statusCode: 200,
        body: 'todo item deleted'
      }
    } catch (error) {
      logger.error('Error: ' + error.message)

      return {
        statusCode: 500,
        body: 'An error occured, cannot delete todo Item'
      }
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
