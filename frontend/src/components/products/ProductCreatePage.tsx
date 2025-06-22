import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from '../../services/products';
import ProductForm from './ProductForm';
import type { ProductFormData } from '../../schemas/productSchema';

export default function ProductCreatePage() {
    const navigate = useNavigate();

    const handleCreate = async (data: ProductFormData) => {
        try {
            await createProduct(data);
            toast.success('Produto criado com sucesso!');
            navigate('/');
        } catch (e) {
            console.log(e);
            toast.error('Erro ao criar produto!');
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-3">Cadastrar Produto</h2>
            <ProductForm onSubmit={handleCreate} />
        </div>
    );
}