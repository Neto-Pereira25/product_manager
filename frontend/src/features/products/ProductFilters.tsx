import { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function ProductFilters() {
    const { filters, setFilters } = useProductStore();

    const [search, setSearch] = useState(filters.search);
    const [minPrice, setMinPrice] = useState(filters.minPrice ?? '');
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice ?? '');
    const [hasDiscount, setHasDiscount] = useState(filters.hasDiscount ?? false);

    const applyFilters = () => {
        setFilters({
            search,
            minPrice: minPrice === '' ? undefined : Number(minPrice),
            maxPrice: maxPrice === '' ? undefined : Number(maxPrice),
            hasDiscount
        });
    };

    const clearFilters = () => {
        setSearch('');
        setMinPrice('');
        setMaxPrice('');
        setHasDiscount(false);
        setFilters({
            search: '',
            minPrice: undefined,
            maxPrice: undefined,
            hasDiscount: undefined
        });
    };

    return (
        <Form className='mb=4'>
            <Row className='g-2'>
                <Col md={4}>
                    <Form.Label>🔍 Buscar por nome</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ex.: notebook'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col md={2}>
                    <Form.Label>💲 Preço mínimo</Form.Label>
                    <Form.Control
                        type='number'
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        min={0}
                    />
                </Col>
                <Col md={2}>
                    <Form.Label>💲 Preço máximo</Form.Label>
                    <Form.Control
                        type='number'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        min={0}
                    />
                </Col>
                <Col md={2} className="d-flex align-items-end">
                    <Form.Check
                        type='checkbox'
                        id='has-discount'
                        label='Apenas com desconto'
                        checked={hasDiscount}
                        onChange={(e) => setHasDiscount(e.target.checked)}
                    />
                </Col>
                <Col md={2} className="d-flex align-items-end justify-content-between">
                    <Button variant='outline-primary' onClick={applyFilters}>
                        Aplicar
                    </Button>
                    <Button variant='outline-secondary' onClick={clearFilters}>
                        Limpar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}