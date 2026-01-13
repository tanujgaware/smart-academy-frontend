import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";

export default function Page() {
  const dispatch=useDispatch();
  const router=useRouter();
  const {user,loading}=useSelector((s)=>s.auth);
  useEffect(()=>{
    dispatch(isAuthenticated());
  },[]);
  return (
    <>
      <Navbar  />

      <section className={styles.hero}>
        <h1>Learn. Build. Publish.</h1>
        <p>
          A skill-based course platform where instructors create
          and learners grow with real-world skills.
        </p>

        <div className={styles.actions}>
          <Link href={user?.role=="INSTRUCTOR" ? "/courses/me":"/courses"}className={styles.primary}>
            Browse Courses
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h3>🎯 Skill-Focused</h3>
          <p>Courses designed around practical, in-demand skills.</p>
        </div>

        <div className={styles.feature}>
          <h3>🚀 Publish Instantly</h3>
          <p>Create, manage, and publish courses with ease.</p>
        </div>

        <div className={styles.feature}>
          <h3>📚 Learn Anytime</h3>
          <p>Access published courses and start learning instantly.</p>
        </div>
      </section>

    </>
  );
}