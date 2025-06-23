import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Home } from 'lucide-react';


const NotFound = () => {
    return (
        <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light p-4">
            <Row className="text-center mb-4">
                <Col>
                    <h1 className="display-1 font-weight-bold text-dark">404</h1>
                    <h2 className="h4 font-weight-bold text-dark">Página não encontrada</h2>
                    <p className="text-xl text-gray-600 mb-4 text-dark">A página que você está procurando não existe ou foi movida.</p>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <Button as={Link} to="/" variant="primary" size="lg" className="d-flex align-items-center">
                        <Home className="me-2" />
                        Voltar para a página inicial
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;