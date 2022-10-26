import 'source-map-support/register'

import * as middy from 'middy'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors } from 'middy/middlewares'

import { createTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import { createLogger } from '../../utils/logger'

const logger = createLogger('Create Todo Item')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Implement creating a new TODO item
    logger.info('Processing event: ', event)
    try {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)
      const userId = getUserId(event)

      const item = await createTodo(newTodo, userId)
      return {
        statusCode: 201,
        body: JSON.stringify({
          item
        })
      }
    } catch (error) {
      logger.error('Error: ' + error.message)

      return {
        statusCode: 500,
        body: 'An error occured, cannot create todo Item'
      }
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
