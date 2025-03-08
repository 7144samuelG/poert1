import {useQueryState,parseAsString} from "nuqs";
export function useSearchParams(key:string){
    return useQueryState(
        key,
        parseAsString.withDefault("").withOptions({clearOnDefault:true})
    )
}