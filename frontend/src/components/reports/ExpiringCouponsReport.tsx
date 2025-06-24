import { useEffect } from 'react';
import { useProductStore } from '../../store/productStore';
import { useCouponStore } from '../../store/couponStore';
import { useTheme } from '../../theme/ThemeContext';
import { getExpiringCoupons } from '../../utils/getExpiringCoupons';
import { Card, Col, Table } from 'react-bootstrap';

export default function ExpiringCouponsReport() {
    const { products, fetchProducts } = useProductStore();
    const { coupons, fetchCoupons } = useCouponStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchProducts();
        fetchCoupons();
    }, []);

    const expiringCoupons = getExpiringCoupons(products, coupons);

    return (
        <Col md={12}>
            <Card className={`mb-4 shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header className='d-flex gap-2 fw-bold border-bottom'>
                    Cupons Prestes a Expirar
                </Card.Header>
                <Card.Body>
                    {expiringCoupons.length === 0 ? (
                        <p className='mb-0'>Nenhum cupom expira nos próximo 7 dias.</p>
                    ) : (
                        <Table
                            bordered
                            hover
                            variant={isDark ? 'dark' : undefined}
                            className='mb-0 text-center'
                        >
                            <thead>
                                <tr>
                                    <th>Produtos</th>
                                    <th>Código do Cupom</th>
                                    <th>Expira em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expiringCoupons.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.couponCode}</td>
                                        <td>{item.expiresAt.toLocaleDateString('pt-BR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}