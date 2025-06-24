import { BarChartBig } from 'lucide-react';
import { useEffect } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '../components/layouts/DashboardLayout';
import DiscountImpactReport from '../components/reports/DiscountImpactReport';
import { useProductStore } from '../store/productStore';
import { useTheme } from '../theme/ThemeContext';
import { getStockByPriceRange } from '../utils/getStockByPriceRange';
import HighStockDiscountedProductsReport from '../components/reports/HighStockDiscountedProductsReport';
import TopPriceReductionsReport from '../components/reports/TopPriceReductionsReport';
import CouponEffectivenessReport from '../components/reports/CouponEffectivenessReport';
import PriceComparativeReport from '../components/reports/PriceComparativeReport';

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
                            <Card.Header className={`${textColor} d-flex align-items-center gap-3 fw-bold border-bottom`}>
                                <BarChartBig />
                                Distribuição de Estoque por Faixa de Preço
                            </Card.Header>
                            <Card.Body className={`${textColor}`}>
                                <ResponsiveContainer width='100%' height={350}>
                                    <BarChart data={stockByRange}>
                                        <XAxis
                                            dataKey='range'
                                            stroke={isDark ? '#ccc' : '#333'}
                                            label={{
                                                value: 'Intevalo de Preços (R$)',
                                                position: 'insideBottom',
                                                offset: -5,
                                                fill: isDark ? '#ccc' : '#333',
                                            }}
                                        />
                                        <YAxis
                                            stroke={isDark ? '#ccc' : '#333'}
                                            label={{
                                                value: 'Quantidade de Produtos',
                                                angle: -90,
                                                position: 'insideLeft',
                                                dy: 50,
                                                fill: isDark ? '#ccc' : '#333',
                                            }}
                                        />
                                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#333' : '#fff' }} />
                                        <Bar dataKey='stock' fill={isDark ? '#fff' : '#333'}>
                                            {stockByRange.map((_, index) => (
                                                <Cell key={index} fill={index % 2 === 0 ? '#0d6efd' : '#20c997'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>

                                <Table
                                    striped
                                    bordered
                                    hover
                                    responsive
                                    variant={isDark ? 'dark' : 'light'}
                                    className={`${isDark ? 'table-dark' : 'table-light'} mt-5`}

                                >
                                    <thead>
                                        <tr className='text-center'>
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

                <Row className='mb-4'>
                    <DiscountImpactReport />
                </Row>

                <Row className='mb-4'>
                    <HighStockDiscountedProductsReport />
                </Row>

                <Row className='mt-4'>
                    <TopPriceReductionsReport />
                </Row>

                <Row className='mt-4'>
                    <CouponEffectivenessReport />
                </Row>

                <Row className='mt-4'>
                    <PriceComparativeReport />
                </Row>
            </Container>
        </DashboardLayout>
    );
}