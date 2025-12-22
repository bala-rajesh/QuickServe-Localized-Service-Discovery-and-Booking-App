import { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    preferredTime: "",
    notes: "",
    photo: null,
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d{0,10}$/.test(value)) return;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handlePhotoRemove = () => {
    setProfile({ ...profile, photo: null });
  };

  const handleSave = () => {
    if (!profile.name || !profile.email || !profile.mobile || !profile.password) {
      alert("Please fill all required fields: Name, Email, Mobile, Password");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      alert("Invalid email format");
      return;
    }
    if (profile.mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }
    alert("Profile saved successfully ✅");
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2 className="title">Customer Profile</h2>

      <div className="photo-section">
        {profile.photo ? (
          <img src={profile.photo} alt="Profile" className="profile-pic" />
        ) : (
          <div className="profile-pic placeholder">👤</div>
        )}
        {editMode && (
          <div className="photo-buttons">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            <button onClick={handlePhotoRemove}>Remove Photo</button>
          </div>
        )}
      </div>

      <div className="form-section">
        <label>
          Full Name <span className="required">*</span>
        </label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          disabled={!editMode}
        />

        <label>
          Email <span className="required">*</span>
        </label>
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={!editMode}
        />

        <label>
          Mobile <span className="required">*</span>
        </label>
        <input
          name="mobile"
          value={profile.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          disabled={!editMode}
        />

        <label>
          Password <span className="required">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          placeholder="Password"
          disabled={!editMode}
        />

        <label>
          Address <span className="optional">(Optional)</span>
        </label>
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Address"
          disabled={!editMode}
        />

        <label>
          Preferred Time <span className="optional">(Optional)</span>
        </label>
        <input
          name="preferredTime"
          value={profile.preferredTime}
          onChange={handleChange}
          placeholder="Preferred Time"
          disabled={!editMode}
        />

        <label>
          Notes <span className="optional">(Optional)</span>
        </label>
        <textarea
          name="notes"
          value={profile.notes}
          onChange={handleChange}
          placeholder="Notes"
          disabled={!editMode}
        />

        <div className="buttons">
          <button
            onClick={() => setEditMode(!editMode)}
            className="edit-btn"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
          {editMode && (
            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
