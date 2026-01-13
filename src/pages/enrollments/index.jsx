import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import styles from "./style.module.css";
import { getMyEnrollments } from "@/config/redux/action/enrollmentAction";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const enrollments = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user ,authLoading} = useSelector((s) => s.auth);
  const { myenrollments, loading, error } = useSelector(
    (state) => state.enrollments
  );



  useEffect(() => {
    if (error) {
      toast.error(error?.message || "You Cannot enroll in courses");
      router.push("/course");
    }
  }, [error]);
  useEffect(() => {
    dispatch(getMyEnrollments());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <h1>My Enrollments</h1>

        {loading && <p className={styles.loading}>Loading enrollments...</p>}

        {!loading && myenrollments?.length === 0 && (
          <div className={styles.empty}>
            <p>You are not enrolled in any courses yet.</p>
            <Link href="/courses">Browse courses →</Link>
          </div>
        )}

        <div className={styles.grid}>
          {myenrollments?.map((enrollment) => (
            <div key={enrollment.id} className={styles.card}>
              <img
                src={enrollment.coverImgUrl || "/placeholder.png"}
                alt={enrollment.title}
                className={styles.image}
              />

              <div className={styles.content}>
                <h3>{enrollment.title}</h3>
                <p className={styles.desc}>
                  {enrollment.description}
                </p>

                <Link
                  href={`/courses/${enrollment.id}`}
                  className={styles.view}
                >
                  Continue Learning →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default enrollments;