import { Moon, Sun } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../theme/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
            variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
        >
            <div className='d-flex align-items-center gap-2'>
                {theme === 'dark' ? (
                    <>
                        <Moon />
                        <span>Dark</span>
                    </>
                ) : (
                    <>
                        <Sun />
                        <span>Light</span>

                    </>
                )}
            </div>
        </Button>
    );
}