import { Plus } from 'lucide-react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './ProductPagination';
import ProductFilters from './ProductFilters';
import ProductTable from '../../pages/ProductTable';
import DashboardLayout from '../layouts/DashboardLayout';
import { useTheme } from '../../theme/ThemeContext';

export default function ProductCatalog() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const cardClass = isDark ? 'bg-dark text-light border-light' : 'bg-light text-dark border-secondary';
    const mutedTextClass = isDark ? 'text-secondary' : 'text-muted';

    return (
        <DashboardLayout title='Lista de Produtos'>
            <Card className={`${cardClass}`}>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom">
                    <div className="mb-2 mb-md-0">
                        <h5 className="mb-0">📦 Produtos</h5>
                        <small className={`${mutedTextClass} fs-5`}>Gerencie seu catálogo de produtos</small>
                    </div>
                    <Button
                        className="d-flex align-items-center gap-2"
                        variant={isDark ? 'success' : 'outline-success'}
                        onClick={() => navigate('/create')}
                    >
                        <Plus size={18} />
                        Cadastrar Produto
                    </Button>
                </Card.Header>

                <Card.Body>
                    <ProductFilters />
                    <ProductTable />
                    <ProductPagination />
                </Card.Body>
            </Card>
        </DashboardLayout>
    );
}