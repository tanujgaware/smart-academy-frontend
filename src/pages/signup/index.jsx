import { handleSignup } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./style.module.css";
import Select from "react-select";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleRoleChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedOptions.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.email || !formData.password) {
        toast.error("All fields are required");
        return;
      }

      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      setLoading(true);
      await dispatch(handleSignup(formData)).unwrap();
      setLoading(false);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (err) {
      toast.error(err || "Signup Failed");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p className={styles.subText}>
          Join the platform and start learning or teaching
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="">Role</label>
            <Select
              options={[{ value: "INSTRUCTOR", label: "INSTRUCTOR" }, { value: "STUDENT", label: "STUDENT" }]}
              onChange={handleRoleChange}
              placeholder="Select skills"
              classNamePrefix="react-select"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.primary}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => router.push("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
