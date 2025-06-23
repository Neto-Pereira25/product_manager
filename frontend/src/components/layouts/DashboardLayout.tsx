import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { HelpCircle, Info, Menu, Settings, ShoppingCart, X } from 'lucide-react';

import { useTheme } from '../../theme/ThemeContext';
import Logo from '../Logo';
import ThemeToggle from '../ThemeToggle';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

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
            <Button
                as={Link}
                to={to}
                variant={bgClass}
                onClick={onClick}
                className='w-100 text-start'
                style={{ wordBreak: 'break-word' }}
            >
                {icon}
                <span className='ms-2'>{children}</span>
            </Button>
        </Nav.Item>
    );
};

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgSidebar = isDark ? 'bg-dark text-light' : 'bg-light text-dark';
    const bgNavbar = isDark ? 'bg-dark text-white border-bottom' : 'bg-white text-dark';

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    return (
        <Container fluid className='d-flex flex-column p-0' style={{ height: '100vh', overflow: 'hidden' }}>
            {/* Mobile Header */}
            <Navbar className={`d-md-none px-3 py-2 shadow-sm justify-content-between ${bgNavbar}`}>
                <Logo showText={false} />
                <div className="d-flex align-items-center gap-2">
                    <ThemeToggle />
                    <Button variant={isDark ? 'outline-light' : 'outline-dark'} size='sm' onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </Navbar>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`${bgSidebar} position-fixed top-0 start-0 h-100`}
                style={{
                    width: '250px',
                    zIndex: 1045,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                <div className="p-3 border-bottom">
                    <Logo />
                </div>
                <Nav className='flex-column px-3 pt-3'>
                    <NavItem to='/' icon={<ShoppingCart size={18} />} variant={theme} onClick={closeMobileMenu}>
                        Dashboard
                    </NavItem>
                    <NavItem to='/products' icon={<ShoppingCart size={18} />} variant={theme} onClick={closeMobileMenu}>
                        Lista de Produtos
                    </NavItem>
                    <NavItem to='/administration' icon={<Settings size={18} />} variant={theme} onClick={closeMobileMenu}>
                        Administração
                    </NavItem>
                    <div className='border-top mt-3 pt-3'>
                        <NavItem to='/how-to-use' icon={<HelpCircle size={18} />} variant={theme} onClick={closeMobileMenu}>
                            Como Usar
                        </NavItem>
                        <NavItem to='/about' icon={<Info size={18} />} variant={theme} onClick={closeMobileMenu}>
                            Sobre
                        </NavItem>
                    </div>
                </Nav>
            </div>

            {/* Main Layout */}
            <Row className='flex-grow-1 overflow-auto'>
                {/* Sidebar Desktop */}
                <Col md={2} className={`d-none d-md-flex flex-column ${bgSidebar} border-end shadow-sm p-3`}>
                    <Link to='/' className='text-decoration-none text-reset mb-4'>
                        <Logo />
                    </Link>
                    <Nav className='flex-column'>
                        <NavItem to='/' icon={<ShoppingCart size={18} />} variant={theme} onClick={closeMobileMenu}>
                            Dashboard
                        </NavItem>
                        <NavItem to='/products' icon={<ShoppingCart size={18} />} variant={theme} onClick={closeMobileMenu}>
                            Lista de Produtos
                        </NavItem>
                        <NavItem to='/administration' icon={<Settings size={18} />} variant={theme} onClick={closeMobileMenu}>
                            Administração
                        </NavItem>
                        <div className='border-top mt-3 pt-3'>
                            <NavItem to='/how-to-use' icon={<HelpCircle size={18} />} variant={theme} onClick={closeMobileMenu}>
                                Como Usar
                            </NavItem>
                            <NavItem to='/about' icon={<Info size={18} />} variant={theme} onClick={closeMobileMenu}>
                                Sobre
                            </NavItem>
                        </div>
                    </Nav>
                </Col>

                {/* Page Content */}
                <Col className='d-flex flex-column p-0 overflow-hidden'>
                    {/* Topbar Desktop */}
                    <Navbar className={`shadow-sm px-3 d-none d-md-flex justify-content-between ${bgNavbar}`} expand='md'>
                        <Navbar.Text className={`fw-bold ${isDark ? 'text-light' : 'text-dark'}`}>{title}</Navbar.Text>
                        <div className="d-flex gap-2 align-items-center">
                            <ThemeToggle />
                        </div>
                    </Navbar>

                    {/* Page Title Mobile */}
                    <div className={`${isDark ? 'bg-dark' : 'bg-light'} d-md-none px-3 py-2 border-bottom`}>
                        <h1 className={`h5 m-0 ${isDark ? 'text-light' : 'text-dark'}`}>{title}</h1>
                    </div>

                    {/* Content */}
                    <main className='flex-grow-1 overflow-y-auto py-3 px-4'>
                        {children}
                    </main>
                </Col>
            </Row>
        </Container>
    );
};