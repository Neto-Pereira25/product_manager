import { Edit, Tag } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button, ButtonGroup, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { calculateFinalPrice } from '../../utils/calculateFinalPrice';
import ApplyCouponModal from './ApplyCouponModal';
import RemoveDiscountButton from './RemoveDiscountButton';
import RemoveProductButton from './RemoveProductButton';

export default function ProductTable() {
    const navigate = useNavigate();
    const { products, paginatedProducts, loading } = useProductStore();


    const [showCouponModal, setShowCouponModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Carregando produtos...</span>
                </Spinner>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className='text-center p-4'>
                <p className='text-muted'>Nenhum produto encontrado</p>
                <p className='text-muted'>Cadastre alguns produtos para poder vê-los</p>
            </div>
        );
    }

    return (
        <div className='d-none d-md-block table-responsive'>
            {/* <div className='d-flex justify-content-between align-items-center mb-3'>
                <h5>{paginatedProducts.length} produtos encontrados nessa página</h5>
                <Button variant='outline-success' onClick={() => navigate('/create')}>
                    <Plus size={18} />
                    Cadastrar Produto
                </Button>
            </div> */}
            <Table hover className="mb-0">
                <thead className='table-light'>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Status</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map((product) => {
                        const price = parseFloat(product.price);
                        const finalPrice = calculateFinalPrice(product);
                        const isOutOfStock = product.stock === 0;
                        const hasDiscount = !!product.productDiscount;

                        return (
                            <tr key={product.id}>
                                <td className="fw-medium">
                                    {product.name}
                                </td>

                                <td>
                                    <div className="text-truncate-2" style={{ maxWidth: '200px' }}>
                                        {product.description || '-'}
                                    </div>
                                </td>

                                <td>
                                    {hasDiscount ? (
                                        <>
                                            <div className='text-muted text-decoration-line-through'>
                                                {price}
                                            </div>
                                            <div className='fw-bold text-success'>
                                                {finalPrice.toFixed(2)}
                                            </div>
                                        </>
                                    ) : (
                                        price
                                    )}
                                </td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className="d-flex flex-wrap gap-1">
                                        {isOutOfStock && <Badge bg="danger">Esgotado</Badge>}
                                        {hasDiscount && (
                                            <Badge bg='success'>
                                                -{((Number(product.price) - finalPrice) / Number(product.price) * 100).toFixed(0)}%
                                            </Badge>
                                        )}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <ButtonGroup size='sm'>
                                        <Button
                                            size='sm'
                                            variant='outline-primary'
                                            onClick={() => navigate(`/edit/${product.id}`)}
                                        >
                                            <Edit size={14} />
                                        </Button>
                                        {hasDiscount ? (
                                            <RemoveDiscountButton productId={product.id} />
                                        ) : (

                                            <Button
                                                size='sm'
                                                variant='outline-success'
                                                className='ms-2'
                                                onClick={() => {
                                                    setSelectedProductId(product.id);
                                                    setShowCouponModal(true);
                                                }}
                                            >
                                                <Tag size={14} />
                                            </Button>
                                        )}

                                        <RemoveProductButton productId={product.id} />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {selectedProductId !== null && (
                <ApplyCouponModal
                    productId={selectedProductId}
                    show={showCouponModal}
                    onClose={() => {
                        setShowCouponModal(false);
                        setSelectedProductId(null);
                    }}
                />
            )}
        </div>
    );
}