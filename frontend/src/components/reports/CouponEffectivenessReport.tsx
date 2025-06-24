import { useEffect } from 'react';
import { useCouponStore } from '../../store/couponStore';
import { useProductStore } from '../../store/productStore';
import { useTheme } from '../../theme/ThemeContext';
import { getCouponEffectiveness } from '../../utils/getCouponEffectiveness';
import { Card, Col, Table } from 'react-bootstrap';
import { Tag } from 'lucide-react';

export default function CouponEffectivenessReport() {
    const { products, fetchProducts } = useProductStore();
    const { coupons, fetchCoupons } = useCouponStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchProducts();
        fetchCoupons();
    }, []);

    const effectiveness = getCouponEffectiveness(products, coupons);

    return (
        <Col md={12}>
            <Card className={`mb-4 shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header className='d-flex align-items-center gap-2 fw-bold border-bottom'>
                    <Tag size={20} />
                    Efetividade dos Cupon
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
                                    <th>Código</th>
                                    <th>Tipo</th>
                                    <th>Aplicações</th>
                                    <th>Total em Descontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {effectiveness.length > 0 ? (
                                    effectiveness.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.code}</td>
                                            <td>{item.type === 'percent' ? 'Percentual' : 'Fixo'}</td>
                                            <td>{item.uses}</td>
                                            <td>R$ {item.totalDiscount.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4}>
                                            Nenhum cupon aplicado até o momento
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}