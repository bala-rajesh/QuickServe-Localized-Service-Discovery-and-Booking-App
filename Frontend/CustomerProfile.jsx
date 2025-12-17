import { useState } from "react";

export default function CustomerProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState("All"); // Booking filter

  const [customer, setCustomer] = useState({
    fullName: "Arun Kumar",
    email: "arun.kumar@gmail.com",
    phone: "9876543210",
    age: 22,
    gender: "Male",
    address: "Trichy, Tamil Nadu",
    alternatePhone: "",
    city: "Trichy",
    pincode: "620001",
    membership: "Gold",
    preferredTime: "Morning",
    language: "Tamil, English",
    emergencyContact: "",
    notes: "Prefers quick service",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
  });

  const [bookings] = useState([
    { id: 1, service: "AC Repair", date: "20 Dec 2025", time: "10:00 AM", status: "Upcoming", details: "AC not cooling properly." },
    { id: 2, service: "Washing Machine Service", date: "15 Dec 2025", time: "02:00 PM", status: "Completed", details: "Routine maintenance done." },
    { id: 3, service: "Plumbing", date: "10 Dec 2025", time: "11:30 AM", status: "Cancelled", details: "Customer cancelled due to personal reasons." },
    { id: 4, service: "Carpentry", date: "18 Dec 2025", time: "09:00 AM", status: "Current", details: "Fixing door hinges." },
  ]);

  const validate = (name, value) => {
    let msg = "";
    if (["phone", "alternatePhone", "emergencyContact"].includes(name)) {
      if (value && !/^\d{10}$/.test(value)) msg = "Phone number must be exactly 10 digits";
    }
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) msg = "Invalid email format";
    setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const saveField = (name, value) => {
    setCustomer(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSave = () => {
    if (Object.values(errors).some(e => e)) return;
    setEditProfile(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomer(prev => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const removePhoto = () => setCustomer(prev => ({ ...prev, photo: "" }));

  const bg = dark ? "#020617" : "#f8fafc";
  const card = dark ? "#0f172a" : "#ffffff";
  const text = dark ? "#e5e7eb" : "#020617";

  const Field = ({ label, name, required, type = "text", maxLength }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, opacity: 0.7 }}>
        {label} {required ? "• Required" : "• Optional"}
      </span>
      {editProfile ? (
        <input
          type={type}
          defaultValue={customer[name]}
          maxLength={maxLength}
          onBlur={(e) => saveField(name, e.target.value)}
          style={{
            padding: "10px",
            borderRadius: 8,
            border: errors[name] ? "1px solid #ef4444" : "1px solid #cbd5f5",
            background: dark ? "#020617" : "#fff",
            color: text
          }}
        />
      ) : (
        <strong>{customer[name] || "—"}</strong>
      )}
      {errors[name] && <small style={{ color: "#ef4444" }}>{errors[name]}</small>}
    </div>
  );

  const filteredBookings = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text }}>
      <div style={{ maxWidth: 1100, margin: "auto", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Back to home arrow */}
          <span
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => alert("Back to Home clicked!")}
          >
            ←
          </span>
          <h2 style={{ fontSize: 24 }}>Customer Profile</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button onClick={() => setDark(!dark)}>{dark ? "Light" : "Dark"}</button>
            <button
              onClick={editProfile ? handleSave : () => setEditProfile(true)}
              disabled={editProfile && Object.values(errors).some(e => e)}
              style={{
                background: editProfile ? (Object.values(errors).some(e => e) ? "#9ca3af" : "#2563eb") : "#020617",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: 8,
                border: "none"
              }}
            >
              {editProfile ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Profile & Details */}
        <div style={{ background: card, borderRadius: 16, padding: 24, marginTop: 24, display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>
          <div style={{ textAlign: "center" }}>
            <img src={customer.photo || "https://via.placeholder.com/140"} alt="profile" style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover" }} />
            {editProfile && (
              <div style={{ marginTop: 10, display: "flex", gap: 8, justifyContent: "center" }}>
                <label style={{ fontSize: 12, cursor: "pointer", color: "#2563eb" }}>
                  Change<input type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
                </label>
                {customer.photo && (
                  <button onClick={removePhoto} style={{ fontSize: 12, color: "#ef4444", background: "none", border: "none" }}>Remove</button>
                )}
              </div>
            )}
            <h3 style={{ marginTop: 12 }}>{customer.fullName}</h3>
            <span style={{ fontSize: 14, opacity: 0.7 }}>{customer.membership} Member</span>
          </div>

          <div>
            <h4>Basic Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 16 }}>
              <Field label="Email" name="email" required />
              <Field label="Phone" name="phone" required maxLength={10} />
              <Field label="Age" name="age" required type="number" />
              <Field label="Gender" name="gender" required />
            </div>

            <h4 style={{ marginTop: 24 }}>Address</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 16 }}>
              <Field label="Address" name="address" required />
              <Field label="City" name="city" />
              <Field label="Pincode" name="pincode" maxLength={6} />
            </div>

            <h4 style={{ marginTop: 24 }}>Preferences</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 16 }}>
              <Field label="Preferred Time" name="preferredTime" />
              <Field label="Languages" name="language" />
              <Field label="Alternate Phone" name="alternatePhone" maxLength={10} />
              <Field label="Emergency Contact" name="emergencyContact" maxLength={10} />
              <Field label="Notes" name="notes" />
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div style={{ marginTop: 32 }}>
          <h3>My Bookings</h3>

          {/* Booking Filter */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {["All", "Upcoming", "Completed", "Cancelled", "Current"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: filter === f ? "2px solid #2563eb" : "1px solid #cbd5f5",
                  background: filter === f ? "#2563eb" : card,
                  color: filter === f ? "#fff" : text,
                  cursor: "pointer"
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Filtered Bookings */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 16 }}>
            {filteredBookings.map(b => (
              <div key={b.id} style={{ background: card, padding: 16, borderRadius: 14 }}>
                <strong>{b.service}</strong>
                <div style={{ fontSize: 13, marginTop: 6 }}>{b.date} • {b.time}</div>
                <span style={{ fontSize: 12, marginTop: 6, display: "inline-block", color:
                  b.status === "Completed" ? "#16a34a" : b.status === "Cancelled" ? "#ef4444" : "#2563eb" }}>
                  {b.status}
                </span>

                {/* Show details inline for Cancelled bookings */}
                {b.status === "Cancelled" && (
                  <p style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>Details: {b.details}</p>
                )}
              </div>
            ))}
            {filteredBookings.length === 0 && <p>No bookings to show.</p>}
          </div>
        </div>

        {toast && (
          <div style={{ position: "fixed", bottom: 20, right: 20, background: "#16a34a", color: "#fff", padding: "12px 18px", borderRadius: 10 }}>
            Profile updated successfully
          </div>
        )}
      </div>
    </div>
  );
}
