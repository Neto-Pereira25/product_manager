import { useForm } from 'react-hook-form';
import { productSchema, type ProductFormData } from '../../schemas/productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';

type ProductFormProps = {
    initialValues?: Partial<ProductFormData>;
    onSubmit: (data: ProductFormData) => void;
    submitText?: string;
};

export default function ProductForm({
    initialValues = {},
    onSubmit,
    submitText = 'Salvar'
}: ProductFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialValues.name ?? '',
            description: initialValues.description ?? '',
            price: initialValues.price ?? 0,
            stock: initialValues.stock ?? 0
        }
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control
                    type='text'
                    {...register('name')}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={2}
                    {...register('description')}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Preço (R$)</Form.Label>
                <Form.Control
                    type='number'
                    step='0.01'
                    {...register('price')}
                    isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.price?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Estoque</Form.Label>
                <Form.Control
                    type='number'
                    step='1'
                    {...register('stock')}
                    isInvalid={!!errors.stock}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.stock?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <div className='text-end'>
                <Button variant='primary' type='submit'>
                    {submitText}
                </Button>
            </div>
        </Form>
    );
}