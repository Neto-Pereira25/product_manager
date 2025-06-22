import ThemeToggle from '../components/ThemeToggle';
import AppRoutes from '../routes/AppRoutes';

export default function MainApp() {

    return (
        <div className={'min-vh-100 p-4'}>
            <ThemeToggle />
            <AppRoutes />
        </div>
    );
}