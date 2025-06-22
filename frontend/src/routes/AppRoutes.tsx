import { Navigate, Route, Routes } from 'react-router-dom';
import ProductFilters from '../features/products/ProductFilters';
import ProductTable from '../features/products/ProductTable';
import ProductPagination from '../features/products/ProductPagination';
import ProductCreatePage from '../features/products/ProductCreatePage';
import ProductEditPage from '../features/products/ProductEditPage';
import { useEffect } from 'react';
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