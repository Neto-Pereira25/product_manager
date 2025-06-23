import { LineChartIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import DashboardLayout from '../components/layouts/DashboardLayout';

import { useCouponStore } from '../store/couponStore';
import { useProductStore } from '../store/productStore';
import { calculateFinalPrice } from '../utils/calculateFinalPrice';
import { getProductsByDate } from '../utils/getProductsByDate';
import { useTheme } from '../theme/ThemeContext';

export default function Dashboard() {
    const { products, fetchProducts } = useProductStore();
    const { fetchCoupons } = useCouponStore();

    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-light' : 'text-dark';
    const cardBg = isDark ? 'bg-dark' : 'bg-white';

    useEffect(() => {
        fetchProducts();
        fetchCoupons();
    }, []);

    const totalProducts = products.length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const withDiscount = products.filter(p => p.productDiscount).length;

    const averagePrice = totalProducts > 0
        ? products.reduce((acc, p) => acc + parseFloat(p.price), 0) / totalProducts
        : 0;

    const averageDiscountValue = withDiscount > 0
        ? products.filter(p => p.productDiscount)
            .reduce((acc, p) => acc + (parseFloat(p.price) - calculateFinalPrice(p)), 0)
        : 0;

    const withCoupon = products.filter(p => p.productDiscount?.type === 'coupon').length;
    const percentWithCoupon = totalProducts > 0 ? (withCoupon / totalProducts) * 100 : 0;
    const productsByDate = getProductsByDate(products);

    return (
        <DashboardLayout title='Dashboard'>
            <Container fluid className='py-3 px-2 px-md-4'>
                <Row className='g-4'>
                    <Col md={12}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={`d-flex justify-content-center align-items-center ${textColor}`}>
                                <h6 className='fs-2 p-0'>Indicadores</h6>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={textColor}>
                                <h6 className='border-bottom'>Produtos Ativos</h6>
                                <h4 className='fw-bold'>{totalProducts}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={textColor}>
                                <h6 className='border-bottom'>Esgotados</h6>
                                <h4 className='fw-bold'>{outOfStock}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={textColor}>
                                <h6 className='border-bottom'>Com Descontos</h6>
                                <h4 className='fw-bold'>{withDiscount}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={textColor}>
                                <h6 className='border-bottom'>Média de Preços</h6>
                                <h4 className='fw-bold'>{averagePrice.toFixed(2)}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={textColor}>
                                <h6 className='border-bottom'>Média de Desconto</h6>
                                <h4 className='fw-bold'>{averageDiscountValue.toFixed(2)}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Body className={textColor}>
                                <h6 className='border-bottom'>% com Cupom</h6>
                                <h4 className='fw-bold'>{percentWithCoupon.toFixed(1)}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col lg={12}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Header className={`${cardBg} ${textColor} fw-bold border-bottom`}>
                                Distribuição de Descontos
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width='100%' height={280}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Com Desconto', value: withDiscount },
                                                { name: 'Sem Desconto', value: totalProducts - withDiscount },
                                            ]}
                                            dataKey='value'
                                            nameKey='name'
                                            cx='50%'
                                            cy='50%'
                                            outerRadius={80}
                                            label
                                        >
                                            <Cell fill='#00C49F' />
                                            <Cell fill='#FF8042' />
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign='bottom' height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={12}>
                        <Card className={`${cardBg} shadow-sm border`}>
                            <Card.Header className={`d-flex fw-bold gap-2 border-bottom ${cardBg} ${textColor}`}>
                                <LineChartIcon size={24} />
                                Produtos Cadastrados por Data
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width='100%' height={280}>
                                    <LineChart data={productsByDate}>
                                        <XAxis dataKey='date' stroke={isDark ? '#ccc' : '#333'} />
                                        <YAxis allowDecimals={false} stroke={isDark ? '#ccc' : '#333'} />
                                        <Tooltip contentStyle={{
                                            background: isDark ? '#333' : '#fff',
                                            color: isDark ? '#fff' : '#333'
                                        }}
                                        />
                                        <Legend />
                                        <Line type='monotone' dataKey='count' stroke={isDark ? '#2dd4bf' : '#4e79a7'} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
}