import React, { useEffect, useState } from 'react'
import styles from "@/styles/Navbar.module.css"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout, isAuthenticated } from '@/config/redux/action/authAction';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated());
  }, []);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "My Courses", path: "/courses/me" },
    { name: "New Course", path: "/course" },
  ];
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/next.svg" alt="Logo" width={36} height={36} />
        </Link>
      </div>

      <ul className={styles.links}>
        <li className={router.pathname === "/"? styles.active : ""}>
            <Link href="/">Home</Link>
        </li>
        <li className={router.pathname === "/course"? styles.active : ""}>
          {user?.role === "INSTRUCTOR" && (
            <Link href="/course">Create Course</Link>
          )}
        </li>
        <li className={router.pathname === "/enrollments" ? styles.active : ""}>
          {user?.role === "STUDENT" && (
            <Link href="/enrollments">My Enrollments</Link>
          )}
        </li>
        <li className={router.pathname === "courses"? styles.active : ""}>
            <Link href="/courses">Courses</Link>
        </li>
        <li className={router.pathname ===" /courses/me" ? styles.active : ""}>
          {user?.role === "INSTRUCTOR" && (
            <Link href="/courses/me">My Courses</Link>
          )}
        </li>
      </ul>

      <div className={styles.auth}>
        {user ? (
          <button
            className={styles.logout}
            onClick={() => {
              dispatch(handleLogout());
              router.push("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className={styles.login}>
              Login
            </Link>
            <Link href="/signup" className={styles.signup}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar