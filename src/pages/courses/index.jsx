import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedCourses } from '@/config/redux/action/courseAction';
import Link from "next/link";
import Navbar from '@/components/Navbar';
import styles from "./style.module.css";
import { useRouter } from 'next/router';

const CoursePage = () => {
    const dispatch = useDispatch();
    const router=useRouter();
    const {user,loading}=useSelector((s)=>s.auth);
  const { publishedCourses, isFetching } = useSelector(s => s.courses);


  useEffect(() => {
    dispatch(fetchPublishedCourses());
  }, []);
  return (
  <>
      <Navbar />

      <div className={styles.page}>
        <h1>All Courses</h1>

        {isFetching&& <p className={styles.loading}>Loading courses...</p>}

        {!isFetching && publishedCourses.length === 0 && (
          <div className={styles.empty}>
            <p>No published courses available yet.</p>
          </div>
        )}

        <div className={styles.grid}>
          {publishedCourses.map((course) => (
            <div className={styles.card} key={course.id}>
              <img
                src={course.coverImgUrl}
                alt={course.title}
                className={styles.image}
              />

              <div className={styles.content}>
                <h3>{course.title}</h3>
                <p className={styles.desc}>{course.description}</p>

                <Link
                  href={`/courses/${course.id}`}
                  className={styles.view}
                >
                  View Course →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursePage;