import { useState, useEffect } from "react";
import CustomerService from "../../api/CustomerService";

// Simple Modal component
function Modal({ visible, onClose, children }) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          maxWidth: "500px",
          width: "90%",
          padding: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function CustomerDashboard({ onBack }) {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalService, setModalService] = useState(null);
  const [modalProvider, setModalProvider] = useState(null);
  const [modalReviews, setModalReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("services"); // 'services' or 'providers'
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const [providers, setProviders] = useState([]);
  const [providersLoading, setProvidersLoading] = useState(true);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Services" },
    { id: "plumber", name: "Plumber" },
    { id: "electrician", name: "Electrician" },
    { id: "tutor", name: "Tutor" },
    { id: "carpenter", name: "Carpenter" },
    { id: "cleaner", name: "Cleaner" },
    { id: "repair", name: "Repair" },
  ];

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      try {
        const params = new URLSearchParams({
          query: searchQuery,
          category: selectedCategory,
        });
        const response = await fetch(`http://localhost:8080/api/customer/services/search?${params}`, {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        alert("Could not load service data.");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchProviders = async () => {
      setProvidersLoading(true);
      try {
        const query = [searchQuery, selectedCategory === 'all' ? '' : selectedCategory].join(' ').trim();
        const data = await CustomerService.searchServices(query);
        
        // Map backend DTO to frontend provider structure
        const formattedProviders = data.map(p => ({
            id: p.id,
            name: p.businessName,
            category: p.category ? p.category.toLowerCase() : 'general',
            address: p.address,
            description: p.bioShort,
            
            // Mapped from backend (defaults provided by controller if missing in DB)
            phone: p.phone || 'N/A',
            email: p.email || 'N/A',
            rating: p.rating || 0,
            experience: p.experience || 'N/A',
            completedJobs: p.completedJobs || 0,
            skills: p.skills && p.skills.length > 0 ? p.skills : ['General Service'],
        }));

        setProviders(formattedProviders);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
        alert("Could not load provider data.");
      } finally {
        setProvidersLoading(false);
      }
    };

    fetchProviders();
  }, [searchQuery, selectedCategory]);

  // Fetch reviews when a service modal is opened
  useEffect(() => {
    if (modalService) {
      const fetchReviews = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/customer/providers/${modalService.providerId}/reviews`, {
            method: 'GET',
            credentials: 'include'
          });
          if (!response.ok) throw new Error("Failed to fetch reviews");
          const reviewsData = await response.json();
          setModalReviews(reviewsData);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
          setModalReviews([]);
        }
      };
      fetchReviews();
    }
  }, [modalService]);

  const handleSearch = () => setSearchQuery(searchText);

  const handleBook = (service) => {
    setBookingService(service);
    setShowBookingForm(true);
    setModalService(null);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone || !bookingData.address || !bookingData.date || !bookingData.time) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/customer/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          providerId: bookingService.providerId,
          serviceTitle: bookingService.name,
          customerName: bookingData.name,
          phone: bookingData.phone,
          address: bookingData.address,
          date: bookingData.date,
          time: bookingData.time,
          price: bookingService.price,
          description: bookingData.description
        })
      });

      if (response.ok) {
        alert("Booking confirmed successfully!");
        setShowBookingForm(false);
        setBookingService(null);
        setBookingData({ name: "", phone: "", address: "", date: "", time: "", description: "" });
      } else {
        alert("Failed to book service. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please check your connection.");
    }
  };

  const handleBookingChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const getProviderById = (id) => providers.find((p) => p.id === id);

  const viewProviderProfile = (providerId) => {
    const provider = getProviderById(providerId);
    if (provider) setModalProvider(provider);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "10px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #007bff",
            backgroundColor: "#fff",
            color: "#007bff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back
        </button>
      )}

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Find Services</h1>

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for services or providers..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "70%",
            padding: "12px",
            borderRadius: "8px 0 0 8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "12px 20px",
            borderRadius: "0 8px 8px 0",
            border: "1px solid #007bff",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
        <button
          onClick={() => setActiveTab("services")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: activeTab === "services" ? "none" : "1px solid #007bff",
            backgroundColor: activeTab === "services" ? "#007bff" : "#fff",
            color: activeTab === "services" ? "#fff" : "#007bff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab("providers")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: activeTab === "providers" ? "none" : "1px solid #007bff",
            backgroundColor: activeTab === "providers" ? "#007bff" : "#fff",
            color: activeTab === "providers" ? "#fff" : "#007bff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Service Providers
        </button>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          marginBottom: "20px",
          padding: "0 10px",
          position: "sticky",
          top: "0",
          background: "#fff",
          zIndex: 100,
        }}
      >
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: selectedCategory === c.id ? "none" : "1px solid #ccc",
              backgroundColor: selectedCategory === c.id ? "#007bff" : "#fff",
              color: selectedCategory === c.id ? "#fff" : "#333",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Services View */}
      {activeTab === "services" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {servicesLoading ? (<p style={{ gridColumn: "1/-1", textAlign: "center" }}>Loading services...</p>) :
           services.length ? (
            services.map((s) => (
              <div
                key={s.id}
                style={{
                  background: "#007bff10",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid #007bff30",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontWeight: "bold", fontSize: "18px" }}>
                  {s.name}
                </h3>
                <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#555" }}>
                  Provider:{" "}
                  <span
                    onClick={() => viewProviderProfile(s.providerId)}
                    style={{
                      color: "#007bff",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {s.providerName}
                  </span>
                </p>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#555" }}>
                  Price: ₹{s.price} | Duration: {s.duration ? `${s.duration} mins` : 'N/A'}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleBook(s)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Book
                  </button>
                  <button
                    onClick={() => setModalService(s)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #007bff",
                      backgroundColor: "#fff",
                      color: "#007bff",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No services found</p>
          )}
        </div>
      )}

      {/* Providers View */}
      {activeTab === "providers" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {providersLoading ? (<p style={{ gridColumn: "1/-1", textAlign: "center" }}>Loading providers...</p>) :
           providers.length ? (
            providers.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#28a74510",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid #28a74530",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontWeight: "bold", fontSize: "18px" }}>
                  {p.name}
                </h3>
                <div style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#555" }}>
                  ⭐ {p.rating} | {p.completedJobs} jobs completed
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#555" }}>
                  Experience: {p.experience}
                </p>

                <button
                  onClick={() => setModalProvider(p)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No providers found</p>
          )}
        </div>
      )}

      {/* Service Details Modal */}
      <Modal visible={modalService !== null} onClose={() => setModalService(null)}>
        {modalService && (
          <>
            <h2 style={{ marginBottom: "8px" }}>{modalService.name}</h2>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Provider:</strong>{" "}
              <span
                onClick={() => {
                  viewProviderProfile(modalService.providerId);
                  setModalService(null);
                }}
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {modalService.providerName}
              </span>
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Price:</strong> ₹{modalService.price} | <strong>Duration:</strong>{" "}
              {modalService.duration ? `${modalService.duration} mins` : 'N/A'}
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Details:</strong> {modalService.description}
            </p>

            {/* Latest Reviews */}
            <div style={{ margin: "10px 0", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
              <h3 style={{ marginBottom: "6px" }}>Latest Reviews (⭐ {modalService.providerRating.toFixed(1)})</h3>
              {modalReviews.length ? (
                <ul style={{ paddingLeft: "20px" }}>
                  {modalReviews.map((review) => (
                    <li key={review.id} style={{ marginBottom: "8px", fontSize: '14px' }}>
                      <strong>{review.customerName}</strong> ({"⭐".repeat(review.rating)}):
                      <em style={{ display: 'block', color: '#555' }}>"{review.comment}"</em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No previous bookings</p>
              )}
            </div>

            <button
              onClick={() => {
                handleBook(modalService);
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Book Now
            </button>
          </>
        )}
      </Modal>

      {/* Provider Profile Modal */}
      <Modal visible={modalProvider !== null} onClose={() => setModalProvider(null)}>
        {modalProvider && (
          <>
            <h2 style={{ marginBottom: "12px" }}>{modalProvider.name}</h2>
            
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                ⭐ {modalProvider.rating} | {modalProvider.completedJobs} jobs completed
              </div>
              <p style={{ margin: "0 0 8px 0", color: "#555" }}>
                <strong>Experience:</strong> {modalProvider.experience}
              </p>
            </div>

            <div style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>
              <p style={{ margin: "0 0 8px 0" }}>{modalProvider.description}</p>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <h3 style={{ marginBottom: "8px" }}>Skills</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {modalProvider.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#007bff20",
                      color: "#007bff",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>
              <h3 style={{ marginBottom: "8px" }}>Contact Information</h3>
              <p style={{ margin: "0 0 6px 0", fontSize: "14px" }}>
                <strong>Phone:</strong> {modalProvider.phone}
              </p>
              <p style={{ margin: "0 0 6px 0", fontSize: "14px" }}>
                <strong>Email:</strong> {modalProvider.email}
              </p>
              <p style={{ margin: "0", fontSize: "14px" }}>
                <strong>Address:</strong> {modalProvider.address}
              </p>
            </div>

            <button
              onClick={() => {
                alert(`Contacting ${modalProvider.name}...`);
                setModalProvider(null);
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Contact Provider
            </button>
          </>
        )}
      </Modal>

      {/* Booking Form Modal */}
      <Modal visible={showBookingForm} onClose={() => {
        setShowBookingForm(false);
        setBookingService(null);
        setBookingData({ name: "", phone: "", address: "", date: "", time: "" });
      }}>
        {bookingService && (
          <>
            <h2 style={{ marginBottom: "12px" }}>Book Service</h2>
            
            <div style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "12px", 
              borderRadius: "8px", 
              marginBottom: "16px" 
            }}>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "16px" }}>{bookingService.name}</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                Provider: {bookingService.providerName} | Price: ₹{bookingService.price}
              </p>
            </div>

            <form onSubmit={handleBookingSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleBookingChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => handleBookingChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Service Address *
                </label>
                <textarea
                  value={bookingData.address}
                  onChange={(e) => handleBookingChange("address", e.target.value)}
                  placeholder="Enter complete address where service is needed"
                  required
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "Arial, sans-serif",
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleBookingChange("date", e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Preferred Time *
                </label>
                <input
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => handleBookingChange("time", e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Description / Notes
                </label>
                <textarea
                  value={bookingData.description}
                  onChange={(e) => handleBookingChange("description", e.target.value)}
                  placeholder="Describe the issue or task details..."
                  rows="2"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    fontFamily: "Arial, sans-serif",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm(false);
                    setBookingService(null);
                    setBookingData({ name: "", phone: "", address: "", date: "", time: "", description: "" });
                  }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    color: "#333",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
}