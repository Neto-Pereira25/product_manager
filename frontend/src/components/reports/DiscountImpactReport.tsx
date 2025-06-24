import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { Card, Col, Table } from 'react-bootstrap';
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useCouponStore } from '../../store/couponStore';
import { useProductStore } from '../../store/productStore';
import { useTheme } from '../../theme/ThemeContext';
import { getDiscountImpact } from '../../utils/getDiscountImpact';

const colors = ['#4e79a7', '#f28e2c'];

export default function DiscountImpactReport() {
    const { products, fetchProducts } = useProductStore();
    const { coupons, fetchCoupons } = useCouponStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchProducts();
        fetchCoupons();
    }, []);

    const data = getDiscountImpact(products, coupons);

    return (
        <Col md={12}>
            <Card className={`mb-4 shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header className='d-flex align-items-center gap-3 fw-bold border-bottom'>
                    <TrendingDown size={20} />
                    <TrendingUp size={20} />
                    Impacto Financeiro dos Descontos
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive mb-4">
                        <Table
                            striped
                            bordered
                            hover
                            variant={isDark ? 'dark' : 'light'}
                            className='mb-0 text-center'
                        >
                            <thead>
                                <tr>
                                    <th>Tipo de Desconto</th>
                                    <th>Total de Produtos</th>
                                    <th>Valor Médio do Desconto</th>
                                    <th>Economia Total Estimada</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.label}</td>
                                        <td>{row.count}</td>
                                        <td>R$ {row.averageDiscount.toFixed(2)}</td>
                                        <td>R$ {row.totalSaved.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <ResponsiveContainer width='100%' height={350}>
                        <BarChart data={data}>
                            <XAxis dataKey='label' />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                            <Legend />
                            <Bar dataKey='totalSaved' name='Economia Estimada'>
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </Col>
    );
}