import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useProductStore } from '../../store/productStore';
import type { Product } from '../../store/productStore';
import { useCouponStore } from '../../store/couponStore';
import { getValidCoupons } from '../../utils/getValidCoupon';

type ApplyCouponModalProps = {
    product: Product;
    show: boolean;
    onClose: () => void;
};

export default function ApplyDiscountModal({
    product,
    show,
    onClose
}: ApplyCouponModalProps) {
    const [discountType, setDiscountType] = useState<'percent' | 'coupon'>('percent');
    const [percentValue, setPercentValue] = useState('');
    const [couponId, setCouponId] = useState<number | ''>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchProducts = useProductStore((s) => s.fetchProducts);
    const { coupons, fetchCoupons } = useCouponStore();
    const validCoupons = getValidCoupons(coupons);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (discountType === 'percent') {
                const value = Number(percentValue);
                if (isNaN(value) || value < 1 || value > 80) {
                    setError('O valor do desconto percentual deve estar entre 1% e 80%.');
                    return;
                }
                await api.post(`/api/v1/products/${product.id}/discount/percent`, { value });
            } else {
                if (!couponId) {
                    setError('Selecione um cupom válido.');
                    return;
                }

                const selectedCoupon = validCoupons.find(c => c.id === couponId);
                if (!selectedCoupon) {
                    setError('Cupom inválido ou expirado.');
                    return;
                }

                await api.post(`/api/v1/products/${product.id}/discount/coupon`, { code: selectedCoupon.code });
            }

            toast.success('Desconto aplicado com sucesso!');
            await fetchProducts();
            onClose();
        } catch (e: any) {
            const msg = e?.response?.data?.message || 'Erro ao aplicar desconto.';
            setError(msg);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Aplicar Cupom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Produto</Form.Label>
                        <Form.Control type="text" value={product.name} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Desconto</Form.Label>
                        <Form.Select
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value as 'percent' | 'coupon')}
                        >
                            <option value="percent">Desconto Percentual</option>
                            <option value="coupon">Cupom Promocional</option>
                        </Form.Select>
                    </Form.Group>

                    {discountType === 'percent' ? (
                        <Form.Group className="mb-3">
                            <Form.Label>Valor do Desconto (%)</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={80}
                                step={1}
                                value={percentValue}
                                onChange={(e) => setPercentValue(e.target.value)}
                                placeholder="Ex: 10"
                                required
                            />
                            <Form.Text className="text-muted">Entre 1% e 80%</Form.Text>
                        </Form.Group>
                    ) : (
                        <Form.Group className="mb-3">
                            <Form.Label>Selecione o Cupom</Form.Label>
                            <Form.Select
                                value={couponId}
                                onChange={(e) => setCouponId(Number(e.target.value))}
                                required
                            >
                                <option value="">-- Selecione um cupom --</option>
                                {validCoupons.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.code} ({c.type === 'percent' ? `-${c.value}%` : `-R$ ${Number(c.value).toFixed(2)}`})
                                    </option>
                                ))}
                            </Form.Select>
                            {validCoupons.length === 0 && (
                                <Form.Text className="text-muted">
                                    Nenhum cupom válido disponível.
                                </Form.Text>
                            )}
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Aplicando...' : 'Aplicar Desconto'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
