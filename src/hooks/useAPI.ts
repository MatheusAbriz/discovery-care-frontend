import { useQuery } from "@tanstack/react-query";

type APIProps<T> = {
    queryKey: string,
    queryFn: () => Promise<T>
}
export const useApi = <T>({queryKey, queryFn}: APIProps<T>) =>{
    const { data, isLoading, isError, refetch } = useQuery<T>({
        queryKey: [queryKey],
        queryFn: queryFn
    });

    return {
        data,
        isLoading,
        isError,
        refetch
    }
};