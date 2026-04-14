import React, { useState } from "react";

export default function StudentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    skills: "",
    password: "",
    confirmPassword: "",
    education: [{ degree: "", institute: "" }],
    file: null,
  });

  const [errors, setErrors] = useState({});

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Education
  const handleEducationChange = (index, e) => {
    const values = [...form.education];
    values[index][e.target.name] = e.target.value;

    setForm({
      ...form,
      education: values,
    });
  };

  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...form.education,
        { degree: "", institute: "" },
      ],
    });
  };

  // File
  const handleFile = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  // Validation
  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";
    if (!form.email.includes("@")) err.email = "Invalid email";

    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords mismatch";
    }

    return err;
  };

  // Progress calculation
  const getProgress = () => {
    let filled = 0;
    const total = 7;

    if (form.name) filled++;
    if (form.email) filled++;
    if (form.phone) filled++;
    if (form.dob) filled++;
    if (form.skills) filled++;
    if (form.password) filled++;
    if (form.education[0].degree) filled++;

    return Math.floor((filled / total) * 100);
  };

  const progress = getProgress();

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      alert("Submitted 🚀");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Registration</h2>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
            }}
          />
        </div>

        <p style={styles.progressText}>
          {progress}% completed
        </p>

        <div style={styles.main}>
          {/* LEFT FORM */}
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="date"
              name="dob"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="skills"
              placeholder="Skills"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              style={styles.input}
            />

            <p style={styles.error}>
              {errors.confirmPassword}
            </p>

            <h4>Education</h4>

            {form.education.map((edu, index) => (
              <div key={index} style={styles.eduRow}>
                <input
                  name="degree"
                  placeholder="Degree"
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  style={styles.input}
                />

                <input
                  name="institute"
                  placeholder="Institute"
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  style={styles.input}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              style={styles.addBtn}
            >
              + Add Education
            </button>

            <input
              type="file"
              onChange={handleFile}
              style={styles.input}
            />

            {form.file && <p>{form.file.name}</p>}

            <button
              type="submit"
              style={styles.button}
            >
              Register
            </button>
          </form>

          {/* RIGHT PREVIEW */}
          <div style={styles.preview}>
            <h3>Output Preview</h3>
            <pre>
              {JSON.stringify(form, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// STYLES
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eaf4ff",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "800px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
  },

  main: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  eduRow: {
    display: "flex",
    gap: "10px",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#5a8dee",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
  },

  addBtn: {
    width: "100%",
    padding: "8px",
    background: "#dbeafe",
    border: "none",
    borderRadius: "6px",
    marginTop: "5px",
  },

  error: {
    color: "red",
    fontSize: "12px",
  },

  preview: {
    width: "40%",
    background: "#f9fafc",
    padding: "10px",
    borderRadius: "10px",
    overflow: "auto",
  },

  progressBar: {
    height: "8px",
    background: "#ddd",
    borderRadius: "5px",
    marginTop: "10px",
  },

  progressFill: {
    height: "8px",
    background: "#5a8dee",
    borderRadius: "5px",
  },

  progressText: {
    fontSize: "12px",
    textAlign: "right",
  },
};
