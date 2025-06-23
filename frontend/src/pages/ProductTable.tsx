import { Edit, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, Row, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApplyDiscountModal from '../components/products/ApplyDiscountModal';
import ProductCard from '../components/products/ProductCard';
import RemoveDiscountButton from '../components/products/RemoveDiscountButton';
import RemoveProductButton from '../components/products/RemoveProductButton';
import { useCouponStore } from '../store/couponStore';
import { useProductStore, type Product } from '../store/productStore';
import { useTheme } from '../theme/ThemeContext';
import { calculateFinalPrice } from '../utils/calculateFinalPrice';
import { formatDiscountLabel } from '../utils/formatDiscountLabel';

export default function ProductTable() {
    const navigate = useNavigate();
    const { products, paginatedProducts, loading } = useProductStore();
    const { coupons, fetchCoupons } = useCouponStore();

    const [showCouponModal, setShowCouponModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const textMutedClass = isDark ? 'text-secondary' : 'text-muted';
    const tableBodyClass = isDark ? 'bg-dark' : '';
    const tableClass = isDark ? 'table-dark table-hover' : 'table-light table-hover';
    const headBg = isDark ? 'bg-secondary' : 'bg-light';
    const mutedClass = isDark ? 'text-secondary' : 'text-muted';

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
                <p className={`${textMutedClass}`}>Nenhum produto encontrado</p>
                <p className={`${textMutedClass}`}>Cadastre alguns produtos para poder vê-los</p>
            </div>
        );
    }

    return (
        <>
            <div className='d-none d-md-block table-responsive'>
                <Table hover className={`mb-0 ${tableClass} border`}>
                    <thead className={`${headBg}`}>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Status</th>
                            <th className='text-center'>Ações</th>
                        </tr>
                    </thead>
                    <tbody className={`${tableBodyClass}`}>
                        {paginatedProducts.map((product) => {
                            const price = parseFloat(product.price);
                            const finalPrice = calculateFinalPrice(product);
                            const isOutOfStock = product.stock === 0;
                            const hasDiscount = !!product.productDiscount;

                            return (
                                <tr key={product.id}>
                                    <td className='fw-medium'>
                                        {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                                    </td>

                                    <td>
                                        <div className={`text-truncate-2 ${mutedClass}`} style={{ maxWidth: '200px' }}>
                                            {product.description || '-'}
                                        </div>
                                    </td>

                                    <td>
                                        {hasDiscount ? (
                                            <>
                                                <div className={`${mutedClass} text-decoration-line-through`}>
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
                <Row xs={1} sm={1} md={1} lg={4} className='g-3'>
                    {paginatedProducts.map(product => (
                        <Col>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}