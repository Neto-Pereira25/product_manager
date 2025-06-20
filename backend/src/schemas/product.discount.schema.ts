import { z } from 'zod';

const RESERVED_CODES = ['admin', 'auth', 'null', 'undefined'];

export const ApplyPercentDiscountSchema = z.object({
    productId: z
        .number({
            required_error: 'O id do produto é requerido',
            invalid_type_error: 'O id do produto precisa ser um número'
        })
        .int('O id do produto precisa ser um número inteiro')
        .positive({
            message: 'ID do produto deve ser um número positivo'
        }),
    percent: z
        .number({
            required_error: 'O percentual é requerido',
            invalid_type_error: 'O percentual precisa ser um número'
        })
        .min(1, { message: 'Desconto percentual mínimo é 1%' })
        .max(80, { message: 'Desconto percentual máximo é 80%' }),
});

export type ApplyPercentDiscountDTO = z.infer<typeof ApplyPercentDiscountSchema>;


export const ApplyCouponDiscountSchema = z.object({
    productId: z
        .number({
            required_error: 'O id do produto é requerido',
            invalid_type_error: 'O id do produto precisa ser um número'
        })
        .int('O id do produto precisa ser um número inteiro')
        .positive({
            message: 'ID do produto deve ser um número positivo'
        }),
    code: z
        .string({
            required_error: 'O código é requerido',
            invalid_type_error: 'O código deve ser um texto'
        })
        .min(4, 'O código deve ter 4 ou mais caracteres')
        .max(20, 'O código deve ter no máximo 20 caracteres')
        .regex(/^[a-zA-Z0-9]+$/, 'O código deve conter apenas letras e números, sem espaços nem símbolos')
        .refine((value) => !RESERVED_CODES.includes(value.toLowerCase()), {
            message: 'O código reservado ou inválido',
        }),
});

export type ApplyCouponDiscountDTO = z.infer<typeof ApplyCouponDiscountSchema>;


export const ProductIdDiscountSchema = z.object({
    productId: z
        .number({
            required_error: 'O id do produto é requerido',
            invalid_type_error: 'O id do produto precisa ser um número'
        })
        .int('O id do produto precisa ser um número inteiro')
        .positive({ message: 'O id do produto deve ser um número positivo' }),
});

export type RemoveDiscountDTO = z.infer<typeof ProductIdDiscountSchema>;
