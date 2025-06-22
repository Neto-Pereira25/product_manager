import DashboardLayout from '../components/layouts/DashboardLayout';
import AppRoutes from '../routes/AppRoutes';

export default function MainApp() {

    return (
        <DashboardLayout title='Lista de Produtos'>
            <div className={'min-vh-100 p-4'}>
                <AppRoutes />
            </div>
        </DashboardLayout>
    );
}