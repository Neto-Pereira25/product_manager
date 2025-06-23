import { XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import RemoveDiscountModal from '../modals/RemoveDiscountModal';

type Props = {
    productId: number;
};

export default function RemoveDiscountButton({ productId }: Props) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                size='sm'
                variant='outline-warning'
                onClick={() => setShow(true)}
            >
                <XCircle size={14} />
            </Button>

            <RemoveDiscountModal
                show={show}
                onClose={() => setShow(false)}
                productId={productId}
            />
        </>
    );
}