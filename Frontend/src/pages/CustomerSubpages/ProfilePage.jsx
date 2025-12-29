import { useState, useEffect } from "react";
import CustomerService from "../../api/CustomerService";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    photo: null,
  });

  const [initialProfile, setInitialProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await CustomerService.getProfile();
        const userProfile = {
          name: data.fullName,
          email: data.email,
          mobile: data.phone ? String(data.phone) : "",
          address: data.address,
          pincode: data.pincode ? String(data.pincode) : "",
          photo: null, // Photo is not in the DTO
        };
        setProfile(userProfile);
        setInitialProfile(userProfile);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        alert("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const sanitized = value.replace(/[^0-9+]/g, '');
      setProfile({ ...profile, [name]: sanitized.slice(0, 16) });
    } else if (name === "pincode") {
      const sanitized = value.replace(/\D/g, '');
      setProfile({ ...profile, [name]: sanitized.slice(0, 6) });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setProfile({
        ...profile,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSave = async () => {
    if (
      !profile.name ||
      !profile.email ||
      !profile.mobile ||
      !profile.address ||
      !profile.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      alert("Invalid email format");
      return;
    }

    if (profile.mobile.length < 10 || profile.mobile.length > 16) {
      alert("Mobile number must be between 10 and 16 characters");
      return;
    }

    if (profile.pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }

    if (newPassword || confirmPassword) {
      if (!newPassword || !confirmPassword) {
        alert("Fill both password fields");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    try {
      const profileData = {
        fullName: profile.name,
        email: profile.email,
        phone: profile.mobile,
        address: profile.address,
        pincode: profile.pincode,
      };
      await CustomerService.updateProfile(profileData);

      alert("Profile saved successfully ✅");
      setInitialProfile(profile);
      setEditMode(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setEditMode(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading profile...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header with gradient */}
        <div style={styles.header}>
          <h2 style={styles.title}>Customer Profile</h2>
        </div>

        {/* Photo Section */}
        <div style={styles.photoSection}>
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" style={styles.profilePic} />
          ) : (
            <div style={styles.placeholder}>
              <span style={styles.placeholderIcon}>👤</span>
            </div>
          )}

          {editMode && (
            <label style={styles.uploadBtn}>
              📷 Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>

        {/* Form Section */}
        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Full Name <span style={styles.required}>*</span>
            </label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter your full name"
              style={{
                ...styles.input,
                ...(editMode ? {} : styles.inputDisabled),
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Email <span style={styles.required}>*</span>
            </label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="your.email@example.com"
              style={{
                ...styles.input,
                ...(editMode ? {} : styles.inputDisabled),
              }}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Mobile <span style={styles.required}>*</span>
              </label>
              <input
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Phone number (e.g. +91...)"
                style={{
                  ...styles.input,
                  ...(editMode ? {} : styles.inputDisabled),
                }}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Pincode <span style={styles.required}>*</span>
              </label>
              <input
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="6-digit code"
                style={{
                  ...styles.input,
                  ...(editMode ? {} : styles.inputDisabled),
                }}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Address <span style={styles.required}>*</span>
            </label>
            <input
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter your complete address"
              style={{
                ...styles.input,
                ...(editMode ? {} : styles.inputDisabled),
              }}
            />
          </div>

          {/* Password Fields - Only in Edit Mode */}
          {editMode && (
            <>
              <div style={styles.divider}>
                <span style={styles.dividerText}>Change Password (Optional)</span>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    style={styles.input}
                  />
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div style={styles.buttons}>
            <button
              style={styles.editBtn}
              onClick={() => {
                if (editMode) {
                  handleCancel();
                } else {
                  setEditMode(true);
                }
              }}
            >
              {editMode ? "✕ Cancel" : "✏️ Edit Profile"}
            </button>

            {editMode && (
              <button style={styles.saveBtn} onClick={handleSave}>
                ✓ Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "580px",
    margin: "0 auto",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    padding: "28px 24px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "0.3px",
  },
  photoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 24px 24px",
    background: "linear-gradient(to bottom, #f8f9ff 0%, #ffffff 100%)",
  },
  profilePic: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #ffffff",
    boxShadow: "0 8px 24px rgba(79, 70, 229, 0.25)",
  },
  placeholder: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "5px solid #ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
  placeholderIcon: {
    fontSize: "56px",
  },
  uploadBtn: {
    marginTop: "16px",
    background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
  },
  formSection: {
    padding: "24px 28px 32px",
  },
  inputGroup: {
    marginBottom: "20px",
    flex: 1,
  },
  row: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  required: {
    color: "#ef4444",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "2px solid #e5e7eb",
    fontSize: "14px",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  inputDisabled: {
    background: "#f9fafb",
    color: "#6b7280",
    cursor: "not-allowed",
  },
  divider: {
    margin: "28px 0 24px",
    padding: "16px 0",
    borderTop: "2px solid #f3f4f6",
    borderBottom: "2px solid #f3f4f6",
  },
  dividerText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#6b7280",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "28px",
  },
  editBtn: {
    flex: 1,
    padding: "13px 24px",
    background: "#ffffff",
    color: "#4f46e5",
    border: "2px solid #4f46e5",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  saveBtn: {
    flex: 1,
    padding: "13px 24px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
  },
};

// Add hover effects via style tag
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  input:focus {
    outline: none;
    border-color: #4f46e5 !important;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
  }
  label[style*="uploadBtn"]:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);