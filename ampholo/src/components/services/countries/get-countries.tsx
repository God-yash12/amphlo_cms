// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import mock from "../countries/mock.json";
// import data from ""

// export const UseCountriesService = () => {

//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["countries"],
//         queryFn: async () => {
//             const response = await axios.get(mock);
//             console.log(response.data)
//             return response.data;
//         }

//     });

//     return { data, isLoading, isError };

// };

import { useQuery } from "@tanstack/react-query";
import mockData from "./mock.json";

export const UseCountriesService = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      // Mock async data fetching
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 500);
      });
    },
  });

  return { data, isLoading, isError };
};


