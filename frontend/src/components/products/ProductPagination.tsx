import { Pagination } from 'react-bootstrap';
import { useProductStore } from '../../store/productStore';

export default function ProductPagination() {
    const { page, totalPages, setPage } = useProductStore();

    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => setPage(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div className="d-flex justify-content-center mt-3">
            <Pagination>
                <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                />
                {pages}
                <Pagination.Next
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                />
            </Pagination>
        </div>
    );
}
