import { useQuery } from "@tanstack/react-query";

type APIProps<T> = {
    queryKey: string,
    queryFn: () => Promise<T>,
    shouldRunOnInit: boolean
}
export const useApi = <T>({queryKey, queryFn, shouldRunOnInit=true}: APIProps<T>) =>{
    const { data, isLoading, isError, refetch } = useQuery<T>({
        queryKey: [queryKey],
        queryFn: queryFn,
        enabled: shouldRunOnInit
    });

    return {
        data,
        isLoading,
        isError,
        refetch
    }
};