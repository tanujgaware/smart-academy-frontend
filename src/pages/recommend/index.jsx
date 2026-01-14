import Navbar from '@/components/Navbar';
import { getMyRecommendations } from '@/config/redux/action/recommendAction';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const index = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const { myRecommendations, loading, error } = useSelector(s => s.recommend);
  useEffect(() => {
    if (error) {
      toast.error(error?.message || "You are not Authorized to get these");
      router.push("/course");

    }
  }, [error]);
  useEffect(() => {
    dispatch(getMyRecommendations());
  }, []);
  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <h1>My Recommendations</h1>

        {loading && <p className={styles.loading}>Loading Recommendations...</p>}

        {!loading && myRecommendations?.length === 0 && (
          <div className={styles.empty}>
            <p>Get Enrolled to get personalized recommendations.</p>
            <Link href="/courses">Browse courses →</Link>
          </div>
        )}

        <div className={styles.grid}>
          {myRecommendations?.map((course) => (
            <div key={course.id} className={styles.card}>
              <img
                src={course.coverImgUrl || "/placeholder.png"}
                alt={course.title}
                className={styles.image}
              />

              <div className={styles.content}>
                <h3>{course.title}</h3>
                <p className={styles.desc}>
                  {course.description}
                </p>

                <Link
                  href={`/courses/${course.id}`}
                  className={styles.view}
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default index