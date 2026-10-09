// "use client"

import { Metadata } from 'next';
import NotFound from '@/components/notfound';

export const metadata: Metadata = {
    title: "Relik - Not Found",
    description: "Authentic vintage band tees from the golden era of rock, grunge, and alternative",
};

const NotFoundPage = () => {
    return (
        <NotFound />
    );
}
export default NotFoundPage