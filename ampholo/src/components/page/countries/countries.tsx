import { Link } from 'react-router-dom';
import { UseCountriesService } from '../../services/countries/get-countries'; 

const CountryList = () => {
    const { data, isLoading, isError } = UseCountriesService();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching countries</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-semibold text-center mb-8">Countries</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.map((country: any) => (
                    <li key={country.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                        <Link to={`/country/${country.id}`} className="flex flex-col items-center text-center">
                            <img
                                src={country.image.url}
                                alt={country.name}
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            <h2 className="text-xl font-semibold text-gray-900">{country.name}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
