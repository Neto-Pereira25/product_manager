import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z
        .string({
            required_error: 'nome é requerido'
        })
        .min(3, 'nome precisa ter no mínimo 3 caracteres')
        .max(100, 'nome precisa ter no máximo 100 caracteres')
        .regex(/^[a-zA-Z0-9\s\-_,.]+$/, 'O nome contém caracteres inválidos. Use apenas letras, números, espaços, hífens (-), underlines (_), vírgulas (,) e pontos (.)')
        .regex(/^[^\s]+(?:\s[^\s]+)*$/, 'O nome contém caracteres inválidos. Você colocou mais espaços que o necessário entre as palavras ou no começo o no fim do nome'),
    description: z
        .string()
        .max(300, 'A descrição precisar ter no máximo 300 caracteres')
        .optional(),
    stock: z
        .number({
            required_error: 'estoque é requerido',
            invalid_type_error: 'O valor em estoque precisa ser numérico'
        })
        .int('O número em estoque não pode ser decimal')
        .min(0, 'O número em estoque precisar ser maior ou igual a zero')
        .max(999999, 'O número em estoque precisar ser menor ou igual a 999999'),
    price: z
        .number({
            required_error: 'preço é requerido',
            invalid_type_error: 'O valor em preço precisa ser numérico'
        })
        .min(0.01, 'O preço precisar ser maior ou igual a 0.01')
        .max(1000000, 'O preço precisar ser menor ou igual a 1000000'),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;