import Navbar from '@/components/Navbar'
import { uploadCourseVid } from '@/config/redux/action/courseAction';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from "./style.module.css";
import { clearCourseError } from '@/config/redux/reducer/courseReducer';

const index = () => {
    const router = useRouter();
    const { user } = useSelector((s) => s.auth);
    const { error } = useSelector((s) => s.courses);
    const { id } = router.query;
    const dispatch = useDispatch();
    const [vidFile, setVidFile] = useState(null);
    const [vidData, setVidData] = useState({
        title: "",
        videoUrl: ""
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!user) return;

        if (user.role === "STUDENT") {
            toast.error("Unauthorized");
            router.replace("/courses");
        }
    }, [user]);

    useEffect(() => {
        if (!error) return;

        toast.error(error);

        dispatch(clearCourseError());
        router.replace("/courses");
    }, [error]);

    const uploadVideo = async (file) => {
        if (file.size > 100 * 1024 * 1024) {
            toast.error("Video Too Large");
            return null;
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "course_videos");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dlrb6irpp/video/upload", data);
        return res.data.secure_url;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let videoUrl = "";
            if (vidFile) {
                videoUrl = await uploadVideo(vidFile);
            }
            const payload = {
                ...vidData,
                videoUrl
            }
            await dispatch(uploadCourseVid({ courseId: id, vidData: payload })).unwrap();
            toast.success("Video uploaded Sucessfully");
        } catch (err) {
            toast.error(err || "Error occured while uploading")
        } finally {
            setLoading(false);
            setVidFile(null);
            setVidData({
                title: "",
                videoUrl: ""
            })
        }
    }
    return (
        <>
            <Navbar />

            <div className={styles.page}>
                <div className={styles.card}>
                    <h2>Add Course Video</h2>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Video title"
                            value={vidData.title}
                            onChange={e =>
                                setVidData({ ...vidData, title: e.target.value })
                            }
                        />

                        <input
                            type="file"
                            accept="video/*"
                            onChange={e => setVidFile(e.target.files[0])}
                        />

                        {vidFile && (
                            <video className={styles.preview} controls>
                                <source src={URL.createObjectURL(vidFile)} />
                            </video>
                        )}

                        <button disabled={loading}>
                            {loading ? "Uploading..." : "Upload Video"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default index