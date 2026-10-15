import { Metadata } from 'next';
import ClientNotFoundPage from '@/app/client-not-found';

export const metadata: Metadata = {
    title: "Relik - Halaman tidak ditemukan!",
    description: "Halaman tidak ditemukan!",
};

const NotFoundPage = () => {
    return (
        <ClientNotFoundPage />
    );
}
export default NotFoundPage