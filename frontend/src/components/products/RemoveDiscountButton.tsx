import { useState } from 'react';
import { Button } from 'react-bootstrap';
import RemoveDiscountModal from './RemoveDiscountModal';

type Props = {
    productId: number;
};

export default function RemoveDiscountButton({ productId }: Props) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                size='sm'
                variant='outline-danger'
                onClick={() => setShow(true)}
            >
                Remover Desconto
            </Button>

            <RemoveDiscountModal
                show={show}
                onClose={() => setShow(false)}
                productId={productId}
            />
        </>
    );
}