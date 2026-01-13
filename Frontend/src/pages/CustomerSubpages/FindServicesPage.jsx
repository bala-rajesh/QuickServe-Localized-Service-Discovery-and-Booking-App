import React, { useState, useEffect } from 'react';
import CustomerService from '../../api/CustomerService';

const FindServicesPage = () => {
  const [query, setQuery] = useState('');
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState(''); // State for pincode

  const search = async (q) => {
    setLoading(true);
    try {
      // This page is for finding providers, so we use searchProviders
      const data = await CustomerService.searchProviders({ query: q, pincode: pincode });
      setProviders(data || []);
    } catch (err) {
      console.error("Search failed", err);
      setProviders([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search('');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(query); // Trigger search with current query and pincode
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">Find Services</h1>
      
      <form onSubmit={handleSearch} className="flex gap-4 mb-8 flex-wrap">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for services (e.g., Plumbing, Cleaning)..."
          className="flex-1 p-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
        />
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode (e.g., 123456)"
          className="w-32 p-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
        />
        <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center py-10 text-text-light/70 dark:text-text-dark/70">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map(provider => (
            <div key={provider.id} className="p-6 rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-text-light dark:text-text-dark">{provider.businessName}</h3>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                {provider.category}
              </span>
              <p className="text-text-light/80 dark:text-text-dark/80 mb-4 line-clamp-2 text-sm">{provider.bioShort}</p>
              <div className="flex items-center text-sm text-text-light/60 dark:text-text-dark/60">
                <span>📍 {provider.address} ({provider.pincode})</span>
              </div>
              <button className="mt-4 w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                View Details
              </button>
            </div>
          ))}
          {providers.length === 0 && (
            <p className="col-span-full text-center text-text-light/60 dark:text-text-dark/60 py-10">No services found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindServicesPage;