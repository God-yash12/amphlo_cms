import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const UseCountriesService = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["countries"],
        queryFn: async () => {
            const response = await axios.get("https://crmbackend.amphlo.com/api/countries");
            console.log(response.data)
            return response.data;
        }
    });

    return { data, isLoading, isError };

};

