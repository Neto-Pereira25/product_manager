import { useEffect } from 'react';
import { useProductStore } from '../../store/productStore';
import { useTheme } from '../../theme/ThemeContext';
import { getPriceComparative } from '../../utils/getPriceComparative';
import { Card, Col, Table } from 'react-bootstrap';

export default function PriceComparativeReport() {
    const { products, fetchProducts } = useProductStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchProducts();
    }, []);

    const { originalAvg, finalAvg, discountAvg, discountPercent } = getPriceComparative(products);

    return (
        <Col md={12}>
            <Card className={`mb-4 shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header className='d-flex gap-2 fw-bold border-bottom'>

                    Comparativo de Preço Médio
                </Card.Header>
                <Card.Body>
                    <Table
                        bordered
                        hover
                        variant={isDark ? 'dark' : undefined}
                        className='mb-0 text-center'
                    >
                        <thead>
                            <tr>
                                <th>Métrica</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Preço médio original</td>
                                <td>R$ {originalAvg.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Preço médio com desconto</td>
                                <td>R$ {finalAvg.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Desconto médio aplicado</td>
                                <td>R$ {discountAvg.toFixed(2)} ({discountPercent.toFixed(1)}%)</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
    );
}