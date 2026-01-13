import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCourses, fetchPublishedCourses, publishCourse, unpublishCourse } from '@/config/redux/action/courseAction';
import Link from "next/link";
import Navbar from '@/components/Navbar';
import styles from "./style.module.css";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { clearCourseError } from '@/config/redux/reducer/courseReducer';

const Me = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {user,loading}=useSelector((s)=>s.auth);
    const { myCourses, isFetching, error } = useSelector(s => { return s.courses });
    const [updatingId, setUpdatingId] = useState(null);


    useEffect(() => {
        dispatch(fetchMyCourses());
    }, []);

    useEffect(() => {
        if (!error) return;

        toast.error(error.message);

        dispatch(clearCourseError());
        router.replace("/courses");
    }, [error]);

    const handleCourseStatus = async (course) => {
        try {
            setUpdatingId(course.id);
            if (course.status === "PUBLISHED") {
                await dispatch(unpublishCourse(course.id)).unwrap();
                toast.success("Course unpublished");
            } else {
                await dispatch(publishCourse(course.id)).unwrap();
                toast.success("Course published");
            }
        } catch (err) {
            toast.error(err?.message || "Failed to update course status");
        } finally {
            setUpdatingId(null);
        }
    }
    return (
        <>
            <Navbar />

            <div className={styles.page}>
                <h1>My Courses</h1>

                {isFetching && <p className={styles.loading}>Loading courses...</p>}

                {!isFetching && myCourses.length === 0 && (
                    <div className={styles.empty}>
                        <p>You haven’t created any courses yet.</p>
                        <Link href="/course">Create your first course →</Link>
                    </div>
                )}

                <div className={styles.grid}>
                    {myCourses.map((course) => (
                        <div className={styles.card} key={course.id}>
                            <img
                                src={course.coverImgUrl || "/placeholder.png"}
                                alt={course.title}
                                className={styles.image}
                            />

                            <div className={styles.content}>
                                <h3>{course.title}</h3>
                                <span
                                    className={`${styles.status} ${course.status === "PUBLISHED"
                                        ? styles.published
                                        : styles.draft
                                        }`}
                                >
                                    {course.status}
                                </span>

                                <p className={styles.desc}>{course.description}</p>

                                <div className={styles.actions}>
                                    <Link href={`/courses/${course.id}`} className={styles.view}>
                                        View
                                    </Link>

                                    <button
                                        className={`${styles.publish}`}
                                        disabled={updatingId === course.id}
                                        onClick={() => handleCourseStatus(course)}
                                    >
                                        {updatingId === course.id
                                            ? "Updating..."
                                            : course.status === "PUBLISHED"
                                                ? "Unpublish"
                                                : "Publish"}
                                    </button>

                                    <button className={styles.delete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Me;