import Navbar from '@/components/Navbar';
import { handleLogin } from '@/config/redux/action/authAction';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from "./style.module.css"

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value }
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(handleLogin(formData));
    if (handleLogin.fulfilled.match(result)) {
      toast.success("Logged In");
      router.push("/");
    } else {
      toast.error(result.payload.message || "Login failed");
    }

  }
  return (
    <>
      <div className={styles.page}>
        <div className={styles.card}>
          <h2>Login</h2>
          <p className={styles.subText}>
            Access your courses and continue learning
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
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
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.primary}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className={styles.footer}>
            Don’t have an account?{" "}
            <span onClick={() => router.push("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default index