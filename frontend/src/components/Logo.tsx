import { ShoppingCart } from 'lucide-react';

interface LogoProps {
    showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
    return (
        <div className='d-flex align-items-center gap-2'>
            <ShoppingCart className='text-primary' />
            {showText && (
                <span className='fw-bold fs-5 d-none d-md-inline text-truncate'>
                    Product<span className='text-primary'> Manager</span>
                </span>
            )}
        </div>
    );
}