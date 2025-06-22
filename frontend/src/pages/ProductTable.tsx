import { Edit, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Button, ButtonGroup, Card, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProductStore, type Product } from '../store/productStore';
import { calculateFinalPrice } from '../utils/calculateFinalPrice';
import ApplyDiscountModal from '../components/products/ApplyDiscountModal';
import RemoveDiscountButton from '../components/products/RemoveDiscountButton';
import RemoveProductButton from '../components/products/RemoveProductButton';
import { useCouponStore } from '../store/couponStore';
import { formatDiscountLabel } from '../utils/formatDiscountLabel';

export default function ProductTable() {
    const navigate = useNavigate();
    const { products, paginatedProducts, loading } = useProductStore();
    const { coupons, fetchCoupons } = useCouponStore();

    const [showCouponModal, setShowCouponModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '200px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className='visually-hidden'>Carregando produtos...</span>
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
        <>
            <div className='d-none d-md-block table-responsive'>
                <Table hover className='mb-0'>
                    <thead className='table-light'>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Status</th>
                            <th className='text-center'>Ações</th>
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
                                    <td className='fw-medium'>
                                        {product.name}
                                    </td>

                                    <td>
                                        <div className='text-truncate-2' style={{ maxWidth: '200px' }}>
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
                                        <div className='d-flex flex-wrap gap-1'>
                                            {isOutOfStock && <Badge bg='danger'>Esgotado</Badge>}
                                            {hasDiscount && (
                                                <>
                                                    {product.productDiscount?.type === 'percent' ? (
                                                        <Badge bg='success'>
                                                            -{((Number(product.price) - finalPrice) / Number(product.price) * 100).toFixed(0)}%
                                                        </Badge>
                                                    ) : (
                                                        <Badge bg='success'>
                                                            {formatDiscountLabel(product, coupons)}
                                                        </Badge>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className='text-center'>
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
                                                    onClick={() => {
                                                        setSelectedProduct(product);
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
                    {selectedProduct && (
                        <ApplyDiscountModal
                            product={selectedProduct}
                            show={showCouponModal}
                            onClose={() => {
                                setShowCouponModal(false);
                                setSelectedProduct(null);
                            }}
                        />
                    )}

                </Table>
            </div>

            <div className="d-md-none">
                {paginatedProducts.map(product => {
                    const price = parseFloat(product.price);
                    const finalPrice = calculateFinalPrice(product);
                    const isOutOfStock = product.stock === 0;
                    const hasDiscount = !!product.productDiscount;
                    return (
                        <Card className='mb-3'>
                            <Card.Body>
                                <div className='d-flex justify-content-between align-items-start mb-2'>
                                    <h6 className='card-title mb-1 fw-bold'>{product.name}</h6>
                                    <div className='d-flex flex-wrap gap-1'>
                                        {isOutOfStock && (
                                            <Badge bg='danger' className='badge-stock-out'>
                                                Esgotado
                                            </Badge>
                                        )}
                                        {hasDiscount && (
                                            <>
                                                {product.productDiscount?.type === 'percent' ? (
                                                    <Badge bg='success' className='badge-discount'>
                                                        -{((Number(product.price) - finalPrice) / Number(product.price) * 100).toFixed(0)}%
                                                    </Badge>
                                                ) : (
                                                    <Badge bg='success' className='badge-discount'>
                                                        {formatDiscountLabel(product, coupons)}
                                                    </Badge>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <p className='card-text small text-muted mb-2'>{product.description}</p>

                                <div className='row mb-2'>
                                    <div className='col-6'>
                                        <small className='text-muted'>Preço:</small>
                                        <div>
                                            {hasDiscount ? (
                                                <>
                                                    <div className='text-muted small text-decoration-line-through'>
                                                        {price}
                                                    </div>
                                                    <div className='fw-bold text-success'>
                                                        {finalPrice.toFixed(2)}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <span className='fw-bold'>{price}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <small className='text-muted'>Estoque:</small>
                                        <div className='fw-bold'>{product.stock}</div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-end'>
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
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowCouponModal(true);
                                                }}
                                            >
                                                <Tag size={14} />
                                            </Button>
                                        )}

                                        <RemoveProductButton productId={product.id} />
                                    </ButtonGroup>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </>
    );
}