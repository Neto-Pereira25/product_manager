import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { useTheme } from '../theme/ThemeContext';
import { getStockByPriceRange } from '../utils/getStockByPriceRange';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Reports() {
    const { theme } = useTheme();
    const { products, fetchProducts } = useProductStore();

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-light' : 'text-dark';
    const cardBg = isDark ? 'bg-dark' : 'bg-white';

    useEffect(() => {
        fetchProducts();
    }, []);

    const stockByRange = getStockByPriceRange(products);

    return (
        <DashboardLayout title='Relatório'>
            <Container fluid className='py-3 px-3 px-md-4'>
                <Row className='mb-4'>
                    <Col md={12}>
                        <Card className={`${cardBg} shadow-sm`}>
                            <Card.Header className={`${textColor} fw-bold`}>
                                Distribuição de Estoque por Faixa de Preço
                            </Card.Header>
                            <Card.Body className={`${textColor}`}>
                                <ResponsiveContainer width='100%' height={300}>
                                    <BarChart data={stockByRange}>
                                        <XAxis dataKey='range' stroke={isDark ? '#ccc' : '#333'} />
                                        <YAxis stroke={isDark ? '#ccc' : '#333'} />
                                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#333' : '#fff' }} />
                                        <Bar dataKey='stock' fill={isDark ? '0d6efd' : '007bff'}>
                                            {stockByRange.map((_, index) => (
                                                <Cell key={index} fill={index % 2 === 0 ? '#0d6efd' : '#20c997'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>

                                <Table striped bordered hover size='sm' responsive className='mt-4'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Faixa de Preços</th>
                                            <th>Quantidade de Produtos</th>
                                            <th>Estoque Total na Faixa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stockByRange.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.range}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.stock}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
}