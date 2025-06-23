import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, PlusSquare } from 'lucide-react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { productSchema, type ProductFormData } from '../../schemas/productSchema';
import { useTheme } from '../../theme/ThemeContext';

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
    const navigate = useNavigate();
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

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const cardClass = isDark ? 'bg-dark text-light border-secondary' : 'bg-light text-dark border-secondary';

    return (
        <Card className={`${cardClass} mb-4`}>
            <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                <Card.Title className='d-flex align-items-center gap-2'>
                    {submitText === 'Salvar' ? (
                        <>
                            <PlusSquare size={24} />
                            Cadastre o Produto
                        </>
                    ) : (
                        <>
                            <Edit size={24} />
                            Edite o Produto
                        </>
                    )}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Nome do Produto <span className='text-danger'>*</span></Form.Label>
                        <Form.Control
                            type='text'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            style={{
                                background: '#eee'
                            }}
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
                            style={{
                                background: '#eee'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Preço (R$) <span className='text-danger'>*</span></Form.Label>
                        <Form.Control
                            type='number'
                            step='0.01'
                            {...register('price', { valueAsNumber: true })}
                            isInvalid={!!errors.price}
                            style={{
                                background: '#eee'
                            }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.price?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Estoque <span className='text-danger'>*</span></Form.Label>
                        <Form.Control
                            type='number'
                            step='1'
                            {...register('stock', { valueAsNumber: true })}
                            isInvalid={!!errors.stock}
                            style={{
                                background: '#eee'
                            }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.stock?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className='d-flex justify-content-end gap-3'>
                        <Button
                            variant='secondary'
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </Button>
                        <Button variant='primary' type='submit'>
                            {submitText}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}