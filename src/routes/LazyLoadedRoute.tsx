import { lazy, Suspense } from 'react';
import { AppUser } from '../utils/types/base';

/**
 * Lazily load the mentioned component which resides in page directory
 * This method will be used in routes so that the files are loaded only
 * when users are on that route
 */
export function lazyLoadRoute(componentPath: string,user:AppUser) {
    const LazyElement = lazy(() => import(`../pages/${componentPath}`));

    // Wrapping around suspense component is mandatory
    return (
        <Suspense fallback="Loading...">
            <LazyElement user={user}/>
        </Suspense>
    );
}
