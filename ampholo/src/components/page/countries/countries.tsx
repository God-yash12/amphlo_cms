import { Link } from "react-router-dom";

interface Country {
  id: number;
  name: string;
  image?: { url: string };
}

const CountryList = () => {
  // Hardcoded country data
  const countries: Country[] = [
    { id: 1, name: "Nepal", image: { url: "https://flagcdn.com/w320/np.png" } },
    { id: 2, name: "United States", image: { url: "https://flagcdn.com/w320/us.png" } },
    { id: 3, name: "Germany", image: { url: "https://flagcdn.com/w320/de.png" } },
    { id: 4, name: "India", image: { url: "https://flagcdn.com/w320/in.png" } },
    { id: 5, name: "Brazil", image: { url: "https://flagcdn.com/w320/br.png" } },
    { id: 6, name: "Australia", image: { url: "https://flagcdn.com/w320/au.png" } },
    { id: 7, name: "Japan", image: { url: "https://flagcdn.com/w320/jp.png" } },
    { id: 8, name: "South Africa", image: { url: "https://flagcdn.com/w320/za.png" } },
    { id: 9, name: "France", image: { url: "https://flagcdn.com/w320/fr.png" } },
    { id: 10, name: "Canada", image: { url: "https://flagcdn.com/w320/ca.png" } }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Countries</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {countries.map((country: Country) => (
          <li key={country.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <Link to={`${country.name}`} className="flex flex-col items-center text-center">
              <img
                src={country.image?.url || "https://via.placeholder.com/150"}
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
