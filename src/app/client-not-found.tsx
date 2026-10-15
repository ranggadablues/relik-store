"use client"

import NotFound from '@/components/notfound';
import { useAppNavigate } from '@/lib/useAppNavigate';

const ClientNotFoundPage = () => {
    const navigate = useAppNavigate();
    return (
        <NotFound navigate={navigate} />
    );
};

export default ClientNotFoundPage;