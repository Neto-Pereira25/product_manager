import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import RemoveProductModal from './RemoveProductModal';

type Props = {
    productId: number;
};

export default function RemoveProductButton({ productId }: Props) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                size='sm'
                variant='outline-danger'
                onClick={() => setShow(true)}
            >
                <Trash size={14} />
            </Button>

            <RemoveProductModal
                show={show}
                onClose={() => setShow(false)}
                productId={productId}
            />
        </>
    );
}