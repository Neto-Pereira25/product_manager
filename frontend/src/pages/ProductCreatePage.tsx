import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from '../services/products';
import ProductForm from '../components/products/ProductForm';
import type { ProductFormData } from '../schemas/productSchema';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { AxiosError } from 'axios';
import { useProductStore } from '../store/productStore';

export default function ProductCreatePage() {
    const fetchProducts = useProductStore((s) => s.fetchProducts);
    const navigate = useNavigate();

    const handleCreate = async (data: ProductFormData) => {
        try {
            await createProduct(data);
            await fetchProducts();
            toast.success('Produto criado com sucesso!');
            navigate('/products');
        } catch (e: any) {
            if (e instanceof AxiosError) {
                toast.error(e.response?.data.message);
            } else {
                console.log(e);
                toast.error('Erro ao criar produto!');
            }
        }
    };

    return (
        <DashboardLayout title='Cadastrar Produto'>
            <div className="container py-4">
                {/* <h2 className="mb-3">Cadastrar Produto</h2> */}
                <ProductForm onSubmit={handleCreate} />
            </div>
        </DashboardLayout>
    );
}