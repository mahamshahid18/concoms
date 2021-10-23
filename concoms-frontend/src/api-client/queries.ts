import { useQuery } from "react-query";
import { Company } from "../modules/shared/types";

const url = `http://localhost:3000/companies`;

export const useGetCompanies = () => {
    return useQuery(
        'get-companies',
        async () => {
            const response: Response = await fetch(url);
            const data: Company[] = await response.json();
            console.log(data);
            return data;
        },
        {
            staleTime: 10 * 60 * 1000
        }
    );
};
