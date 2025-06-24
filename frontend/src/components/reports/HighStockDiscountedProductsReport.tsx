import { useEffect } from 'react';
import { useProductStore } from '../../store/productStore';
import { useTheme } from '../../theme/ThemeContext';
import { getHighStockDiscountedProducts } from '../../utils/getHighStockDiscountedProducts';
import { Card, Col, Table } from 'react-bootstrap';

export default function HighStockDiscountedProductsReport() {
    const { products, fetchProducts } = useProductStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchProducts();
    }, []);

    const topProducts = getHighStockDiscountedProducts(products);

    return (
        <Col md={12}>
            <Card className={`mb-4 shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header className='fw-bold border-bottom'>
                    Produtos com Maior Estoque com Desconto Ativo
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive">
                        <Table
                            striped
                            bordered
                            hover
                            variant={isDark ? 'dark' : undefined}
                            className='mb-0 text-center'
                        >
                            <thead>
                                <tr>
                                    <td>Produto</td>
                                    <td>Estoque</td>
                                    <td>Tipo de Desconto</td>
                                    <td>Valor Final</td>
                                    <td>Desconto (%)</td>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((p, index) => (
                                    <tr key={index}>
                                        <td>{p.name}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.discountType}</td>
                                        <td>{p.finalPrice}</td>
                                        <td>{p.discountPercent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );

}