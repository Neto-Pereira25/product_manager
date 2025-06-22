import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductFilters from '../components/products/ProductFilters';
import ProductTable from '../components/products/ProductTable';
import ProductPagination from '../components/products/ProductPagination';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductEditPage from '../pages/ProductEditPage';
import { useProductStore } from '../store/productStore';

export default function AppRoutes() {
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <div className='container py-4'>
                        <h2 className="mb-3">📦 Lista de Produtos</h2>
                        <ProductFilters />
                        <ProductTable />
                        <ProductPagination />
                    </div>
                }
            />
            <Route path='/create' element={<ProductCreatePage />} />
            <Route path='/edit/:id' element={<ProductEditPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
}