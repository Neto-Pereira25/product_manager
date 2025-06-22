import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import type { Product } from '../store/productStore';
import type { ProductFormData } from '../schemas/productSchema';
import { getProducts, updateProduct } from '../services/products';
import ProductForm from '../components/products/ProductForm';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function ProductEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        getProducts().then((res) => {
            const found = res.data.find((p: Product) => p.id === Number(id));
            setProduct(found);
        });
    }, [id]);

    const handleUpdate = async (data: ProductFormData) => {
        try {
            await updateProduct(Number(id), data);
            toast.success('Produto atualizado com sucesso!');
            navigate('/');
        } catch (e) {
            console.log(e);
            toast.error('Erro ao atualizar produto!');
        }
    };

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Carregando produtos...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <DashboardLayout title='Editar produto'>
            <div className="container py-4">
                {/* <h2 className="mb-3">Editar Produto</h2> */}
                <ProductForm
                    initialValues={{
                        name: product.name,
                        description: product.description,
                        price: parseFloat(product.price),
                        stock: Number(product.stock),
                    }}
                    onSubmit={handleUpdate}
                    submitText='Editar'
                />
            </div>
        </DashboardLayout>
    );
}