import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { removeProduct } from '../../services/products';
import { useProductStore } from '../../store/productStore';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
    productId: number;
    show: boolean;
    onClose: () => void;
};

export default function RemoveProductModal({
    productId, show, onClose
}: Props) {
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleRemove = async () => {
        try {
            await removeProduct(productId);
            toast.success('Produto removido com sucesso');
            await fetchProducts();
        } catch (e: any) {
            console.log(e);
            toast.error('Erro ao remover o produto');
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
                    Remover Produto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className={`fs-5 ${isDark ? 'text-light' : 'text-dark'}`}>
                    Tem certeza que deseja remover o produto da lista?
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