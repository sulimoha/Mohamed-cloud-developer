import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { TodoAccess } from '../dataLayer/TodosAccess'
import { createLogger } from '../utils/logger'

const logger = createLogger('todos')
const todoAccess = new TodoAccess()

export async function getTodosForUser(userId: string): Promise<TodoItem[]>{
    
    logger.info('GetTodo function: getting todos for user')
    return await todoAccess.GetTodos(userId)
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem>{
    
    logger.info('CreateTodo function: creating todo item')
    const todoId = uuid.v4()

    return await todoAccess.CreateTodo({
        userId: userId,
        todoId: todoId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false
    })
}

export async function updateTodo(todoId: string, updatedTodo: UpdateTodoRequest, userId: string): Promise<string>{

    logger.info('UpdateTodo function: updating todo item')
    return await todoAccess.UpdateTodo({
        userId: userId,
        todoId: todoId,
        createdAt: new Date().toISOString(),
        name: updatedTodo.name,
        dueDate: updatedTodo.dueDate,
        done: updatedTodo.done
    })
}

export async function deleteTodo(todoId: string, userId: string): Promise<string>{

    logger.info('DeleteTodo function: deletiing todo item')
    return await todoAccess.DeleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(todoId: string): Promise<string>{

    logger.info('GenerateUploadUrl function, generating upload url')
    return await todoAccess.GenerateUploadUrl(todoId)
}
