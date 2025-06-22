import { Plus } from 'lucide-react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductPagination from './ProductPagination';
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';

export default function ProductCatalog() {
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div className="mb-2 mb-md-0">
                    <h5 className="mb-0">📦 Produtos</h5>
                    <small className="text-muted">Gerencie seu catálogo de produtos</small>
                </div>
                <Button
                    className="d-flex align-items-center"
                    variant='outline-success'
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
    );
}