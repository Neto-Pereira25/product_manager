import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z
        .string({
            required_error: 'O nome é requerido',
            invalid_type_error: 'O nome deve ser um texto'
        })
        .min(3, 'O nome precisa ter no mínimo 3 caracteres')
        .max(100, 'O nome precisa ter no máximo 100 caracteres')
        .regex(/^[a-zA-Z0-9\s\-_,.]+$/, 'O nome contém caracteres inválidos. Use apenas letras, números, espaços, hífens (-), underlines (_), vírgulas (,) e pontos (.)')
        .regex(/^[^\s]+(?:\s[^\s]+)*$/, 'O nome contém caracteres inválidos. Você colocou mais espaços que o necessário entre as palavras ou no começo o no fim do nome'),
    description: z
        .string({
            invalid_type_error: 'descrição deve ser um texto'
        })
        .max(300, 'A descrição precisar ter no máximo 300 caracteres')
        .optional(),
    stock: z
        .number({
            required_error: 'O estoque é requerido',
            invalid_type_error: 'O valor em estoque precisa ser numérico'
        })
        .int('O estoque não pode ser um número decimal')
        .min(0, 'O estoque precisar ser um número maior ou igual a zero')
        .max(999999, 'O estoque precisar ser um número menor ou igual a 999999'),
    price: z
        .number({
            required_error: 'O preço é requerido',
            invalid_type_error: 'O preço precisa ser número'
        })
        .min(0.01, 'O preço precisar ser maior ou igual a 0.01')
        .max(1000000, 'O preço precisar ser menor ou igual a 1000000'),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;