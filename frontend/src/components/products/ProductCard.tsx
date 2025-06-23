import { useState } from 'react';
import { Edit, Tag } from 'lucide-react';
import { Badge, Button, ButtonGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../theme/ThemeContext';
import { useCouponStore } from '../../store/couponStore';
import type { Product } from '../../store/productStore';
import { calculateFinalPrice } from '../../utils/calculateFinalPrice';
import { formatDiscountLabel } from '../../utils/formatDiscountLabel';
import RemoveDiscountButton from './RemoveDiscountButton';
import RemoveProductButton from './RemoveProductButton';
import ApplyDiscountModal from './ApplyDiscountModal';

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const coupons = useCouponStore((s) => s.coupons);

    const [showModal, setShowModal] = useState(false);

    const price = parseFloat(product.price);
    const finalPrice = calculateFinalPrice(product);
    const hasDiscount = !!product.productDiscount;
    const isOutOfStock = product.stock === 0;

    const cardClass = isDark
        ? 'bg-dark text-light border border-secondary'
        : 'bg-light text-dark border border-light';

    const mutedText = isDark ? 'text-secondary' : 'text-muted';

    return (
        <>
            <Card className={`h-100 shadow-sm ${cardClass}`}>
                <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <Card.Title className="mb-0 fw-semibold">{product.name}</Card.Title>
                            <div className="d-flex flex-wrap gap-1">
                                {isOutOfStock && <Badge bg="danger">Esgotado</Badge>}
                                {hasDiscount && (
                                    <Badge bg="success">
                                        {formatDiscountLabel(product, coupons)}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <Card.Text className={`small ${mutedText}`}>
                            {product.description || '-'}
                        </Card.Text>

                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <small className={mutedText}>Preço</small>
                                <div>
                                    {hasDiscount ? (
                                        <>
                                            <div className={`${mutedText} text-decoration-line-through small`}>
                                                R$ {price.toFixed(2)}
                                            </div>
                                            <div className="fw-bold text-success">
                                                R$ {finalPrice.toFixed(2)}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="fw-bold">R$ {price.toFixed(2)}</div>
                                    )}
                                </div>
                            </div>

                            <div className="text-end">
                                <small className={mutedText}>Estoque</small>
                                <div className="fw-bold">{product.stock}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-end">
                        <ButtonGroup size="sm">
                            <Button
                                variant="outline-primary"
                                onClick={() => navigate(`/edit/${product.id}`)}
                            >
                                <Edit size={14} />
                            </Button>

                            {hasDiscount ? (
                                <RemoveDiscountButton productId={product.id} />
                            ) : (
                                <Button
                                    variant="outline-success"
                                    onClick={() => setShowModal(true)}
                                >
                                    <Tag size={14} />
                                </Button>
                            )}

                            <RemoveProductButton productId={product.id} />
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>

            {showModal && (
                <ApplyDiscountModal
                    product={product}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}