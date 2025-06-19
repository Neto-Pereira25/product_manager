import { z } from 'zod';

const RESERVED_CODES = ['admin', 'auth', 'null', 'undefined'];

export const CreateCouponSchema = z.object({
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
    type: z
        .enum(['fixed', 'percent'], {
            message: 'Tipo inválido! O tipo do cupom só pode ser "fixed" ou "percent"'
        }),
    value: z
        .number({
            required_error: 'O valor é requerido',
            invalid_type_error: 'O valor precisar ser um número'
        })
        .positive('O valor precisar ser um número positivo'),
    oneShot: z
        .boolean({
            required_error: 'A tentativa é requerido',
            invalid_type_error: 'A tentativa precisar ser um booleano'
        }),
    maxUses: z
        .number({
            invalid_type_error: 'O uso máximo precisar ser um número'
        })
        .int('O uso máximo não pode ser um número decimal')
        .positive('O uso máximo precisar ser um número positivo')
        .optional(),
    validFrom:
        z.string({
            required_error: 'A data em que o cupom se torna válido é requerida',
        })
            .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
                message: 'A data em que o cupom se torna válido precisa estar no formato ISO 8601 (YYYY-MM-DD)',
            })
            .refine((val) => !isNaN(Date.parse(val)), {
                message: 'A data em que o cupom se torna válido está inválida',
            })
            .transform((val) => new Date(val)),
    validUntil: z.string({
        required_error: 'A data de validade do cupom é requerida',
    })
        .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'A data de validade precisa estar no formato ISO 8601 (YYYY-MM-DD)',
        })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: 'A data de validade é inválida',
        })
        .transform((val) => new Date(val))
})
    .superRefine((data, ctx) => {
        if (data.type === 'percent') {
            if (data.value < 1 || data.value > 80) {
                ctx.addIssue({
                    path: ['value'],
                    code: z.ZodIssueCode.custom,
                    message: 'Desconto percentual deve estar entre 1% e 80%',
                });
            }
        }

        if (data.validUntil <= data.validFrom) {
            ctx.addIssue({
                path: ['validUntil'],
                code: z.ZodIssueCode.custom,
                message: 'validUntil deve ser maior que validFrom'
            });
        }

        const maxValidDate = new Date(data.validFrom);
        maxValidDate.setFullYear(maxValidDate.getFullYear() + 5);

        if (data.validUntil > maxValidDate) {
            ctx.addIssue({
                path: ['validUntil'],
                code: z.ZodIssueCode.custom,
                message: 'A validade máxima de um cupom é 5 anos',
            });
        }
    });

export type CreateCouponDTO = z.infer<typeof CreateCouponSchema>;