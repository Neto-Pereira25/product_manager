import { ArrowDown } from 'lucide-react';
import { useEffect } from 'react';
import { Card, Col, Table } from 'react-bootstrap';
import { useProductStore } from '../../store/productStore';
import { useTheme } from '../../theme/ThemeContext';
import { getTopPriceReductions } from '../../utils/getTopPriceReductions';

export default function TopPriceReductionsReport() {
    const { products, fetchProducts } = useProductStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchProducts();
    }, []);

    const topReductions = getTopPriceReductions(products);

    return (
        <Col md={12}>
            <Card className={`mb-4 shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header className='d-flex align-items-center gap-2 fw-bold border-bottom'>
                    <ArrowDown size={18} />
                    Top 5 Produtos com Maior Redução em Valor Absoluto
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
                                    <th>Produto</th>
                                    <th>Preço Original</th>
                                    <th>Preço Final</th>
                                    <th>Redução em R$</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topReductions.map((p, index) => (
                                    <tr key={index}>
                                        <td>{p.name}</td>
                                        <td>{p.originalPrice}</td>
                                        <td>{p.finalPrice}</td>
                                        <td>{p.reduction}</td>
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