import Navbar from '@/components/Navbar';
import { fetchCourseById, getVideos } from '@/config/redux/action/courseAction';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./style.module.css"
import { handleEnrollment } from '@/config/redux/action/enrollmentAction';
import { toast } from 'react-toastify';
import { clearCourseError } from '@/config/redux/reducer/courseReducer';

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { user,loading } = useSelector(s => s.auth);
  const { selectedCourse, isFetching, error } = useSelector(s => s.courses);
  const isInstructor = user?.role === "INSTRUCTOR";
  const isStudent = user?.role === "STUDENT";

  const canEnroll =
    isStudent &&
    !selectedCourse?.enrollment &&
    !selectedCourse?.isInstructor;

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCourseById(id));
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Course Not Accessible");
      dispatch(clearCourseError());
      router.replace("/courses");
    }
  }, [error]);

  const enrollToCourse = async (courseId) => {
    try {
      await dispatch(handleEnrollment(courseId)).unwrap();
      toast.success("Enrolled !!!");
    } catch (err) {
      toast.error(err?.message || "Some Error Occured")
    }
  }
  if (isFetching || !selectedCourse) {
    return (
      <>
        <Navbar />
        <div className={styles.isFetching}>Loading course...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className={styles.hero}>
        <h1>{selectedCourse.title}</h1>
        <p>{selectedCourse.description}</p>

        {canEnroll && (
          <button
            className={styles.enrollPrimary}
            onClick={() => enrollToCourse(selectedCourse.id)}
          >
            Enroll
          </button>
        )}

        {selectedCourse?.enrollment && (
          <button className={`${styles.enrollPrimary} ${styles.disabled}`} disabled>
            Enrolled
          </button>
        )}

        {selectedCourse?.isInstructor && (
          <button
            className={styles.enrollPrimary}
            onClick={() => router.push(`/courses/${selectedCourse.id}/vid`)}
          >
            Manage Course
          </button>
        )}

      </section>

      <section className={styles.content}>
        <div className={styles.card}>
          <h3>Skills You’ll Learn</h3>
          <div className={styles.skills}>
            {selectedCourse?.skills?.map((skill, id) => (
              <span key={id} className={styles.skill}>
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        {selectedCourse?.enrollment && (<>
          <h2>Ready to start learning?</h2>
          <p>Enroll now and build real-world skills.</p>
          <button
            onClick={() =>
              router.push(`/courses/${selectedCourse.id}/vid`)
            }
            className={styles.enrollPrimary}
          >
            Start Learning
          </button>
        </>
        )}

        {canEnroll && (
          <>
            <h2>Ready to start learning?</h2>
            <p>Enroll now and build real-world skills.</p>
            <button
              className={styles.enrollPrimary}
              onClick={() => enrollToCourse(selectedCourse.id)}
            >
              Enroll
            </button>
          </>
        )}

        {selectedCourse.isInstructor && (
          <>
            <h2>Ready to start learning?</h2>
            <p>Enroll now and build real-world skills.</p>
            <button
              className={styles.enrollPrimary}
              onClick={() => router.push(`/courses/${selectedCourse.id}/addvid`)}
            >
              Add Videos
            </button>
          </>
        )}
      </section>

    </>

  );
}
export default CourseDetail;