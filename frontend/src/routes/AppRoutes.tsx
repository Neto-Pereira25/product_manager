import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductCatalog from '../components/products/ProductCatalog';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductEditPage from '../pages/ProductEditPage';
import { useProductStore } from '../store/productStore';
import About from '../pages/About';
import HowToUse from '../pages/HowToUse';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Routes>
            <Route path='/' element={<ProductCatalog />} />
            <Route path='/create' element={<ProductCreatePage />} />
            <Route path='/edit/:id' element={<ProductEditPage />} />
            <Route path='/how-to-use' element={<HowToUse />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}