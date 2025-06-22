import { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BrushCleaning, Filter, Search } from 'lucide-react';

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
        <Form className='mb-4'>
            <Row className='g-3'>
                {/* Campo de busca */}
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text>
                            <Search size={16} />
                        </InputGroup.Text>
                        <Form.Control
                            type='text'
                            placeholder='Buscar produtos...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>

                {/* Preço mínimo */}
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text>💲</InputGroup.Text>
                        <Form.Control
                            type='number'
                            value={minPrice}
                            placeholder='Preço mín.'
                            onChange={(e) => setMinPrice(e.target.value)}
                            min={0}
                        />
                    </InputGroup>
                </Col>

                {/* Preço máximo */}
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text>💲</InputGroup.Text>
                        <Form.Control
                            type='number'
                            value={maxPrice}
                            placeholder='Preço máx.'
                            onChange={(e) => setMaxPrice(e.target.value)}
                            min={0}
                        />
                    </InputGroup>
                </Col>

                {/* Filtro de desconto */}
                <Col md={12} className="d-flex align-items-end">
                    <div className='d-flex justify-content-between align-items-center w-100 gap-2'>
                        <Form.Check
                            type='checkbox'
                            id='has-discount'
                            label='Apenas com desconto'
                            checked={hasDiscount}
                            onChange={(e) => setHasDiscount(e.target.checked)}
                        />
                        <div className='d-flex gap-2'>
                            <Button variant='outline-primary' onClick={applyFilters}>
                                <Filter size={16} />
                            </Button>
                            <Button variant='outline-secondary' onClick={clearFilters}>
                                <BrushCleaning size={16} />
                            </Button>
                        </div>
                    </div>
                </Col>

                {/* <Col xs={12} md={2} className="d-flex align-items-end justify-content-between">

                </Col> */}
            </Row>
        </Form>
    );
}