import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { removeProduct } from '../../services/products';
import { useProductStore } from '../../store/productStore';

type Props = {
    productId: number;
    show: boolean;
    onClose: () => void;
};

export default function RemoveProductModal({
    productId, show, onClose
}: Props) {
    const fetchProducts = useProductStore((s) => s.fetchProducts);

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
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remover Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja remover o produto da lista?
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