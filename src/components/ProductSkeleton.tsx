export default function ProductSkeleton() {
    return (
        <div className="bg-zinc-800 border border-zinc-700 animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-square bg-zinc-700" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Band name skeleton */}
                <div className="h-3 bg-zinc-700 rounded w-2/3" />
                {/* Product name skeleton */}
                <div className="h-4 bg-zinc-700 rounded w-full" />
                {/* Price skeleton */}
                <div className="flex items-center justify-between pt-2">
                    <div className="h-6 bg-zinc-700 rounded w-20" />
                    <div className="h-8 w-8 bg-zinc-700 rounded" />
                </div>
            </div>
        </div>
    );
}