import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import AppRoutes from '../routes/AppRoutes';

export default function MainApp() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={'min-vh-100 p-4'}>
            <button onClick={toggleTheme} className='btn btn-outline-secondary mb-3'>
                <div className='d-flex align-items-center gap-2'>
                    {theme === 'dark' ? (
                        <>
                            <Sun />
                            <span>Light</span>

                        </>
                    ) : (
                        <>
                            <Moon />
                            <span>Dark</span>
                        </>
                    )}
                </div>
            </button>
            <AppRoutes />
        </div>
    );
}