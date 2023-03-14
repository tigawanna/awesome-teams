import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

interface LoadMoreButtonProps<T> {
    query: UseInfiniteQueryResult<InfiniteData<T>, Error>
}

export function LoadMoreButton<T,>({query}:LoadMoreButtonProps<T>){
return (

    <div>
        {(!query.isPending && !query.isError ) &&
            <button
                className="text-accent font-bold mb-2  rounded"
                onClick={() => query.fetchNextPage()}
                disabled={!query.hasNextPage || query.isFetchingNextPage}
            >
                {query.isFetchingNextPage
                    ? 'Loading more...'
                    : query.hasNextPage
                        ? '... Load More ...'
                        : '...Nothing more to load...'}
            </button>
        }
    </div>
);
}
