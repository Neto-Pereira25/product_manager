import { Database, Settings, Shield, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';
import DashboardLayout from '../components/layouts/DashboardLayout';
import NotImplementedModal from '../components/modals/NotImplementedModalProps';
import { useTheme } from '../theme/ThemeContext';

export const Administration: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const cardClass = isDark ? 'bg-dark text-light border-light' : 'bg-light text-dark border-secondary';

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const handleShowModal = (title: string) => {
        setModalTitle(title);
        setShowModal(true);
    };

    return (
        <DashboardLayout title='Administração'>
            <div>
                <h2 className="mb-4">Área de Administração</h2>

                {/* MODAL CENTRALIZADO */}
                <NotImplementedModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    modalTitle={modalTitle}
                />

                {/* Configurações e Usuários */}
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className={`${cardClass}`}>
                            <Card.Header className="d-flex align-items-center border-bottom">
                                <Settings size={20} className="me-2" />
                                <h5 className="mb-0">Configurações do Sistema</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nome da Empresa</Form.Label>
                                        <Form.Control type="text" defaultValue="Minha Empresa LTDA" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Moeda Padrão</Form.Label>
                                        <Form.Select defaultValue="BRL">
                                            <option value="BRL">Real (R$)</option>
                                            <option value="USD">Dólar ($)</option>
                                            <option value="EUR">Euro (€)</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Check
                                        type="checkbox"
                                        label="Notificações por email"
                                        className="mb-3"
                                        defaultChecked
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        label="Backup automático"
                                        className="mb-4"
                                        defaultChecked
                                    />

                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowModal('Salvar Configurações')}
                                    >
                                        Salvar Configurações
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card className={`${cardClass}`}>
                            <Card.Header className="d-flex align-items-center border-bottom">
                                <Users size={20} className="me-2" />
                                <h5 className="mb-0">Usuários do Sistema</h5>
                            </Card.Header>
                            <Card.Body>
                                {[
                                    {
                                        name: 'João Silva',
                                        email: 'joao@empresa.com',
                                        role: 'Admin',
                                        variant: 'success',
                                    },
                                    {
                                        name: 'Maria Santos',
                                        email: 'maria@empresa.com',
                                        role: 'Editor',
                                        variant: 'primary',
                                    },
                                    {
                                        name: 'Carlos Oliveira',
                                        email: 'carlos@empresa.com',
                                        role: 'Visualizador',
                                        variant: 'secondary',
                                    },
                                ].map((user) => (
                                    <div
                                        key={user.email}
                                        className="d-flex justify-content-between align-items-center p-2 border rounded mb-3"
                                    >
                                        <div>
                                            <strong>{user.name}</strong>
                                            <div className="small">{user.email}</div>
                                        </div>
                                        <Badge bg={user.variant}>{user.role}</Badge>
                                    </div>
                                ))}

                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleShowModal('Adicionar Usuário')}
                                >
                                    Adicionar Usuário
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Segurança e Backup */}
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className={`${cardClass}`}>
                            <Card.Header className="d-flex align-items-center border-bottom">
                                <Shield size={20} className="me-2" />
                                <h5 className="mb-0">Segurança</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-3">
                                    <strong>Último login:</strong>
                                    <div>Hoje às 09:45</div>
                                </div>

                                <div className="mb-3">
                                    <strong>Tentativas de login falhadas:</strong>
                                    <div>0 nas últimas 24h</div>
                                </div>

                                <div className="mb-3">
                                    <strong>Sessões ativas:</strong>
                                    <div>1 sessão</div>
                                </div>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        onClick={() => handleShowModal('Alterar Senha')}
                                    >
                                        Alterar Senha
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleShowModal('Encerrar Todas as Sessões')}
                                    >
                                        Encerrar Todas as Sessões
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card className={`${cardClass}`}>
                            <Card.Header className="d-flex align-items-center border-bottom">
                                <Database size={20} className="me-2" />
                                <h5 className="mb-0">Backup e Manutenção</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-3">
                                    <strong>Último backup:</strong>
                                    <div>Ontem às 02:00</div>
                                </div>

                                <div className="mb-3">
                                    <strong>Tamanho do banco:</strong>
                                    <div>2.5 MB</div>
                                </div>

                                <div className="mb-3">
                                    <strong>Versão do sistema:</strong>
                                    <div>v1.0.0</div>
                                </div>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleShowModal('Fazer Backup')}
                                    >
                                        Fazer Backup
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => handleShowModal('Limpar Cache')}
                                    >
                                        Limpar Cache
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    );
};
