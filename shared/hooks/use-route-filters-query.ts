import React from "react";
import { Filters, QueryFilters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
        const isMounted = React.useRef(false)
        const router = useRouter();
        React.useEffect(() => {
            if(isMounted.current){
                const params = {
                    ...filters.prices,
                    ingredients: Array.from(filters.selectedIds),
                };
                const query = qs.stringify(params, {arrayFormat: 'comma'});
                router.push(`?${query}`)
            }
            isMounted.current = true
        },[filters ])
}