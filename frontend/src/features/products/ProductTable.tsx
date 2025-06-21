import { Table, Badge, Spinner } from 'react-bootstrap';
import { useProductStore } from '../../store/productStore';
import { calculateFinalPrice } from '../../utils/calculateFinalPrice';

export default function ProductTable() {
    const { paginatedProducts, loading } = useProductStore();

    console.log('produtos:', paginatedProducts);

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
            <Table>
                <thead className='table-dark'>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Estoque</th>
                        <th>Preço Original</th>
                        <th>Preço com Desconto</th>
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
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}