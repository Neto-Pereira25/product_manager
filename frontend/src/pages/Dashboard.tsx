import { useEffect } from 'react';
import { useCouponStore } from '../store/couponStore';
import { useProductStore } from '../store/productStore';
import { calculateFinalPrice } from '../utils/calculateFinalPrice';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Dashboard() {
    const { products, fetchProducts } = useProductStore();
    const { coupons, fetchCoupons } = useCouponStore();

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

    return (
        <DashboardLayout title='Dashboard'>
            <Container fluid className='py-3 px-2 px-md-4'>
                <Row className='g-4'>
                    <Col md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='text-muted'>Produtos Ativos</h6>
                                <h4 className='fw-bold'>{totalProducts}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='text-muted'>Esgotados</h6>
                                <h4 className='fw-bold'>{outOfStock}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='text-muted'>Com Descontos</h6>
                                <h4 className='fw-bold'>{withDiscount}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='text-muted'>Média de Preços</h6>
                                <h4 className='fw-bold'>{averagePrice.toFixed(2)}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='text-muted'>Média de Desconto</h6>
                                <h4 className='fw-bold'>{averageDiscountValue.toFixed(2)}</h4>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='text-muted'>% com Cupom</h6>
                                <h4 className='fw-bold'>{percentWithCoupon.toFixed(1)}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
}