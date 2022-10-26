import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger('Get Todo Items')

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    logger.info('Processing event: ', event)
    try {
      const userId = getUserId(event)
      const todos = await getTodosForUser(userId)

      return {
        statusCode: 200,        
        body: JSON.stringify({
          items: todos
        })
      }
    } catch (error) {
      logger.error('Error: ' + error.message)
      return {
        statusCode: 500,
        body: 'An error occured, cannot get user todos'
      }
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
