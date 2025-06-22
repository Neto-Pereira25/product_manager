import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { calculateFinalPrice } from '../../utils/calculateFinalPrice';
import ApplyCouponModal from './ApplyCouponModal';
import RemoveDiscountButton from './RemoveDiscountButton';

export default function ProductTable() {
    const navigate = useNavigate();
    const { paginatedProducts, loading } = useProductStore();


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

    return (
        <div className='table-responsive'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h5>{paginatedProducts.length} produtos encontrados nessa página</h5>
                <Button variant='outline-success' onClick={() => navigate('/create')}>
                    <Plus size={18} />
                    Cadastrar Produto
                </Button>
            </div>
            <Table>
                <thead className='table-dark'>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Estoque</th>
                        <th>Preço Original</th>
                        <th>Preço com Desconto</th>
                        <th>Ações</th>
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
                                <td>
                                    {product.name}{' '}
                                    {hasDiscount && (
                                        <Badge bg='success' className='ms-1'>
                                            Desconto
                                        </Badge>
                                    )}
                                </td>
                                <td>{product.description || '-'}</td>
                                <td>
                                    {product.stock}{' '}
                                    {isOutOfStock && (
                                        <Badge bg='danger' className='ms-1'>
                                            Esgotado
                                        </Badge>
                                    )}
                                </td>
                                <td>R$ {Number(price).toFixed(2)}</td>
                                <td>
                                    {finalPrice !== parseFloat(product.price) ? (
                                        <strong>R$ {Number(finalPrice).toFixed(2)}</strong>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>
                                    <Button
                                        size='sm'
                                        variant='outline-primary'
                                        onClick={() => navigate(`/edit/${product.id}`)}
                                    >
                                        <Edit size={18} />
                                    </Button>
                                    <Button
                                        size='sm'
                                        variant='outline-success'
                                        className='ms-2'
                                        onClick={() => {
                                            setSelectedProductId(product.id);
                                            setShowCouponModal(true);
                                        }}
                                    >
                                        Cupom
                                    </Button>
                                    <RemoveDiscountButton productId={product.id} />
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