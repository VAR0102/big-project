import { useNavigate, useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { handlePasswordChange, handlePrivacy, handleLoginChange, } from "../../../helpers/api";
import { useState } from "react";

export const Settings = () => {
  const { account, setAccount, } = useOutletContext<IContext>();
  const [error, setError] = useState<string>("");
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [newLogin, setNewLogin] = useState<string>("");
  const navigate = useNavigate();


  const changePrivacy = () => {
    handlePrivacy().then(() => {
      setAccount({ ...account, isPrivate: account.isPrivate === 1 ? 0 : 1 });
    });
  };

  const changePassword = () => {
    const form = new FormData();
    form.append("old", oldPass);
    form.append("newpass", newPass);
    handlePasswordChange(form)
      .then(() => {
        setError("");
        navigate("/login");
      })
      .catch(() => setError("Failed to change password"));
  };

  
  const changeLogin = () => {
    const form = new FormData();
    form.append("password", oldPass);
    form.append("newLogin", newLogin);
    handleLoginChange(form)
      .then(() => {
        setError("");
        navigate("/login");
      })
      .catch(() => setError("Failed to change login"));
  };


 
  
  return  (
    <div style={styles.container}>
      <h1 style={styles.heading}>Settings</h1>

      <div style={styles.section}>
        <h2 style={styles.subHeading}>
          {account.isPrivate === 1 ? "Account is private" : "Account is open"}
        </h2>
        <button style={styles.button} onClick={changePrivacy}>
          Change Privacy
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeading}>Change Password</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="password"
          placeholder="Old Password"
          onChange={(e) => setOldPass(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPass(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={changePassword}>
          Submit
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeading}>Change Login</h2>
        <input
          type="password"
          placeholder="Current Password"
          onChange={(e) => setOldPass(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="New Login"
          onChange={(e) => setNewLogin(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={changeLogin}>
          Submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center" as const,
    color: "#333",
  },
  section: {
    marginBottom: "30px",
  },
  subHeading: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};