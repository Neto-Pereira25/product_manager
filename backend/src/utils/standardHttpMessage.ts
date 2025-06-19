import { StatusCodes } from "http-status-codes";

export const standardHttpMessage = {
    OK: {
        status: StatusCodes.OK,
        message: 'Requisição bem sucedida'
    },
    CREATED: {
        status: StatusCodes.CREATED,
        message: 'Recurso criado com sucesso'
    },
    BAD_REQUEST: {
        status: StatusCodes.BAD_REQUEST,
        message: 'A requisição está mal formada ou inválida'
    },
    UNAUTHORIZED: {
        status: StatusCodes.UNAUTHORIZED,
        message: 'Autenticação necessária, tente fazer login novamente'
    },
    FORBIDDEN: {
        status: StatusCodes.FORBIDDEN,
        message: 'Você não tem permissão para acessar este recurso'
    },
    NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        message: 'Recurso não encontrado'
    },
    UNPROCESSABLE_ENTITY: {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Recurso não processável. Verifique os dados enviados'
    },
    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Erro interno do servidor. Tente novamente mais tarde'
    },
    NO_CONTENT: {
        status: StatusCodes.NO_CONTENT,
        message: 'Recurso removido com sucesso'
    },
    CONFLICT: {
        status: StatusCodes.CONFLICT,
        message: 'Recurso já existe na base de dados'
    },
}