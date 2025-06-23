import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductCatalog from '../components/products/ProductCatalog';
import About from '../pages/About';
import HowToUse from '../pages/HowToUse';
import NotFound from '../pages/NotFound';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductEditPage from '../pages/ProductEditPage';
import { useProductStore } from '../store/productStore';
import { Administration } from '../pages/Administration';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';

export default function AppRoutes() {
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/products' element={<ProductCatalog />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/create' element={<ProductCreatePage />} />
            <Route path='/edit/:id' element={<ProductEditPage />} />
            <Route path='/how-to-use' element={<HowToUse />} />
            <Route path='/about' element={<About />} />
            <Route path='/administration' element={<Administration />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}