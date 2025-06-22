import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useProductStore } from '../../store/productStore';

type ApplyCouponModalProps = {
    productId: number;
    show: boolean;
    onClose: () => void;
};

export default function ApplyCouponModal({
    productId,
    show,
    onClose
}: ApplyCouponModalProps) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    const handleApplyCoupon = async () => {
        if (!code) return toast.warning('Digite um código de cupom');

        setLoading(true);
        try {
            await api.post(`/api/v1/products/${productId}/discount/coupon`, { code });
            toast.success('Cupom aplicado com sucesso!');
            await fetchProducts();
        } catch (e: any) {
            const msg = e?.response?.data?.message || 'Erro ao aplicar cupom';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Aplicar Cupom</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Código do Cupom</Form.Label>
                    <Form.Control
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Ex.: DESCONTO15"
                        autoFocus
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={handleApplyCoupon}
                    disabled={loading}
                >
                    {loading ? 'Aplicando...' : 'Aplicar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
