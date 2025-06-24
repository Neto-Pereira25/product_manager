import { Github, Javascript, Linkedin, Typescript } from 'react-bootstrap-icons';
import { BiLogoPostgresql } from 'react-icons/bi';
import { FaBootstrap, FaCss3, FaGitAlt, FaHtml5, FaJava, FaNodeJs, FaReact, FaSass } from 'react-icons/fa';
import { RiNextjsFill } from 'react-icons/ri';
import { SiMysql, SiPython, SiSpringboot } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

import { Code, Coffee, Heart, Send } from 'lucide-react';
import { Badge, Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useTheme } from '../theme/ThemeContext';

export default function About() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const cardClass = isDark ? 'bg-dark text-light border-light' : 'bg-light text-dark border-secondary';
    const textMutedClass = isDark ? 'text-light' : 'text-muted';

    const techs = [
        { name: 'HTML5', color: '#E34F26', icon: <FaHtml5 size={32} /> },
        { name: 'CSS3', color: '#1572B6', icon: <FaCss3 size={32} /> },
        { name: 'Sass', color: '#CC6699', icon: <FaSass size={32} /> },
        { name: 'Bootstrap', color: '#7952B3', icon: <FaBootstrap size={32} /> },
        { name: 'JavaScript', color: '#F7DF1E', icon: <Javascript size={32} color="#000" /> },
        { name: 'TypeScript', color: '#3178C6', icon: <Typescript size={32} /> },
        { name: 'React', color: '#61DAFB', icon: <FaReact size={32} /> },
        { name: 'C#', color: '#7952B3', icon: <TbBrandCSharp size={32} /> },
        { name: 'Python', color: '#3776AB', icon: <SiPython size={32} /> },
        { name: 'Node.js', color: '#339933', icon: <FaNodeJs size={32} /> },
        { name: 'Next.js', color: '#000000', icon: <RiNextjsFill size={32} color="#fff" /> },
        { name: 'Java', color: '#007396', icon: <FaJava size={32} /> },
        { name: 'Spring Boot', color: '#6DB33F', icon: <SiSpringboot size={32} /> },
        { name: 'Git', color: '#F05032', icon: <FaGitAlt size={32} /> },
        { name: 'MySQL', color: '#4479A1', icon: <SiMysql size={32} /> },
        { name: 'PostgreSQL', color: '#336791', icon: <BiLogoPostgresql size={32} /> },
    ];

    interface NavItemProps {
        to: string;
        icon: React.ReactNode;
        children: React.ReactNode;
        variant: 'light' | 'dark';
        onClick?: () => void;
    }

    const NavItem: React.FC<NavItemProps> = ({ to, icon, children, variant, onClick }) => {
        const bgClass = variant === 'dark' ? 'outline-light' : 'outline-dark';
        return (
            <Nav.Item className='mb-2'>
                <Button as="a" href={to} target="_blank" variant={bgClass} onClick={onClick} className='w-100 text-start'>
                    {icon}
                    <span className='ms-2'>{children}</span>
                </Button>
            </Nav.Item>
        );
    };

    return (
        <DashboardLayout title='Sobre o Desenvolvedor'>
            <Container className='px-3 px-md-1'>
                {/* Sobre o Projeto */}
                <Card className={`${cardClass} mb-4`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <Heart size={20} className="text-danger" />
                        Sobre este Projeto
                    </Card.Header>
                    <Card.Body>
                        <p className={`${textMutedClass} text-justify mb-0`}>
                            O <strong>Product Manager</strong> é uma aplicação web desenvolvida como parte do processo seletivo para a vaga de Desenvolvedor Júnior no SENAI.
                            O objetivo principal do projeto é permitir o gerenciamento de produtos e descontos em uma plataforma amigável e eficiente, proporcionando uma visão geral através de dashboards,
                            relatórios detalhados e operações práticas como cadastro, edição, exclusão e aplicação de descontos em produtos.
                        </p>
                        <div className="d-flex flex-wrap gap-2 mt-3">
                            {[
                                'React', 'TypeScript', 'Vite', 'Zustand',
                                'React Router Dom', 'React Bootstrap',
                                'React Toastify', 'Recharts',
                                'Axios'
                            ].map(tech => (
                                <Badge key={tech} bg="secondary">{tech}</Badge>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                {/* Sobre o Desenvolvedor */}
                <Card className={`${cardClass} mb-4`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <Code size={20} />
                        Sobre o Desenvolvedor
                    </Card.Header>
                    <Card.Body>
                        <p className={`${textMutedClass} mb-0`}>
                            Olá! Eu sou um desenvolvedor apaixonado por criar soluções que
                            realmente fazem diferença na vida das pessoas. Este projeto nasceu
                            da vontade de aplicar conhecimentos em desenvolvimento web moderno
                            para resolver um problema cotidiano.
                        </p>

                        <div className="mt-4">
                            <h5 className="fw-semibold">🎯 Minha Missão</h5>
                            <p className={`${textMutedClass} mb-0`}>
                                Desenvolver aplicações web que sejam intuitivas, eficientes e que realmente agreguem valor ao usuário final.
                            </p>
                        </div>

                        <div className="mt-4">
                            <h5 className="fw-semibold">💻 Tecnologias que Domino</h5>

                            <Row className="mt-3 mb-3 g-3">
                                {techs.map(({ name, color, icon }) => (
                                    <Col key={name} xs={4} sm={3} md={2} className="text-center">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded mx-auto"
                                            style={{
                                                backgroundColor: color,
                                                width: '48px',
                                                height: '48px',
                                                color: '#fff',
                                            }}
                                        >
                                            {icon}
                                        </div>
                                        <small className={`d-block mt-1 fw-bold ${isDark ? 'text-light' : 'text-dark'}`}>{name}</small>
                                    </Col>
                                ))}
                            </Row>

                            <p className={`${textMutedClass} mb-0`}>
                                E estou sempre buscando aprender novas tecnologias para criar melhores experiências.
                            </p>
                        </div>

                        <div className="mt-4">
                            <h5 className="fw-semibold d-flex align-items-center gap-2">
                                <Coffee size={18} />
                                Quando não estou programando
                            </h5>
                            <p className={`${textMutedClass} mb-0`}>
                                Gosto de estudar novas tecnologias, ler sobre assuntos variados, jogar videogames e passar tempo com família e amigos.
                            </p>
                        </div>
                    </Card.Body>
                </Card>

                {/* Contato */}
                <Card className={`${cardClass} mb-4`}>
                    <Card.Header className={'d-flex align-items-center gap-2 fw-bold border-bottom'}>
                        <Send size={20} />
                        Entre em Contato
                    </Card.Header>
                    <Card.Body>
                        <p className={`${textMutedClass} mb-3`}>
                            Gostou do projeto? Tem alguma sugestão ou quer trocar uma ideia sobre desenvolvimento?
                            Ficarei feliz em conversar!
                        </p>

                        <div className="d-flex flex-wrap gap-2">
                            <NavItem to="https://github.com/Neto-Pereira25" icon={<Github size={24} />} variant={theme}>
                                Github
                            </NavItem>
                            <NavItem to="https://www.linkedin.com/in/jose-neto-programador/" icon={<Linkedin size={24} />} variant={theme}>
                                Linkedin
                            </NavItem>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </DashboardLayout>
    );
}