import { Modal, Button } from 'react-bootstrap';
import { Wrench } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

interface NotImplementedModalProps {
    show: boolean;
    onClose: () => void;
    modalTitle: string;
}

export default function NotImplementedModal({ show, onClose, modalTitle }: NotImplementedModalProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const modalBg = isDark ? 'bg-dark text-light' : 'bg-white text-dark';
    const iconBg = isDark ? 'bg-secondary' : 'bg-light';

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            contentClassName={isDark ? 'bg-dark text-light' : 'bg-white text-dark'}
        >
            <Modal.Header closeButton closeVariant={isDark ? 'white' : undefined}>
                <Modal.Title className='d-flex align-items-center gap-3'>
                    <div className={`${iconBg} p-2 rounded`}>
                        <Wrench size={24} className={isDark ? 'text-light' : 'text-dark'} />
                    </div>
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={`fs-5 ${modalBg}`}>
                Esta funcionalidade ainda não foi implementada.
            </Modal.Body>
            <Modal.Footer className={modalBg}>
                <Button variant={isDark ? 'outline-light' : 'secondary'} onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
