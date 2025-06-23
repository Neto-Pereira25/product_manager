import { toast } from 'react-toastify';
import { removeDiscount } from '../../services/discount';
import { useProductStore } from '../../store/productStore';
import { Button, Modal } from 'react-bootstrap';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
    productId: number;
    show: boolean;
    onClose: () => void;
};

export default function RemoveDiscountModal({
    productId, show, onClose
}: Props) {
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleRemove = async () => {
        try {
            await removeDiscount(productId);
            toast.success('Desconto removido com sucesso');
            await fetchProducts();
        } catch (e: any) {
            console.log(e);
            toast.error('Erro ao remover o desconto');
        } finally {
            onClose();
        }
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            contentClassName={isDark ? 'bg-dark text-light' : 'bg-white text-dark'}
        >
            <Modal.Header closeButton closeVariant={isDark ? 'white' : undefined}>
                <Modal.Title className={isDark ? 'text-light' : 'text-dark'}>
                    Remover Desconto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className={`fs-5 ${isDark ? 'text-light' : 'text-dark'}`}>
                    Tem certeza que deseja remover o desconto deste produto?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='danger' onClick={handleRemove}>
                    Remover
                </Button>
            </Modal.Footer>
        </Modal>
    );
}