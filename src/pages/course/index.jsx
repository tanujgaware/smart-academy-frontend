import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useState } from 'react'
import styles from "./style.module.css"
import dynamic from 'next/dynamic';
const Select = dynamic(() => import("react-select"), {
    ssr: false
});
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse } from '@/config/redux/action/courseAction';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const SKILL_OPTIONS = [
    { value: "React", label: "React" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "Node.js", label: "Node.js" },
    { value: "Express", label: "Express" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "Java", label: "Java" },
    { value: "MySQL", label: "MySQL" }
]

const CreateCourse = () => {
    const router=useRouter();
    const dispatch = useDispatch();
    const {user}=useSelector((s)=>s.auth);
    const {error}=useSelector((s)=>s.courses);
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [imageFile, setImageFile] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills: [],
        url: ""
    });
    if(user?.role==="STUDENT" || error){
        toast.error("UnAuthorized" || error.message);
        router.push('/courses');
    }
    const handleSkillsChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            skills: selectedOptions
                ? selectedOptions.map(option => option.value) : []
        }))
    }
    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "course_images");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dlrb6irpp/image/upload", data);
        return res.data.secure_url;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            toast.error("Course title is required")
            return
        }

        if (formData.skills.length === 0) {
            toast.error("Select at least one skill")
            return
        }

        try {
            setIsSubmitting(true)

            let imageUrl = ""

            if (imageFile) {
                setIsUploadingImage(true)
                imageUrl = await uploadToCloudinary(imageFile)
                setIsUploadingImage(false)
            }

            const payload = {
                ...formData,
                url: imageUrl
            }

            await dispatch(addNewCourse(payload)).unwrap()

            toast.success("Course created successfully")
            setFormData({
                title: "",
                description: "",
                skills: [],
                url: ""
            })
            setImageFile(null)

        } catch (err) {
            toast.error(err?.message || "Failed to create course")
        } finally {
            setIsSubmitting(false)
            setIsUploadingImage(false)
        }
    }
    return (
        <div className={styles.page}>
            <Navbar />

            <div className={styles.card}>
                <h2>Create New Course</h2>
                <p className={styles.subText}>
                    Add course details that will be visible to students
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.field}>
                        <label>Course Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Master React from Scratch"
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }

                        />
                    </div>

                    <div className={styles.field}>
                        <label>Course Thumbnail</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />

                        {isUploadingImage && (
                            <span className={styles.info}>Uploading image…</span>
                        )}

                        {imageFile && (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Course Preview"
                                className={styles.preview}
                            />
                        )}
                    </div>

                    <div className={styles.field}>
                        <label>Skills Covered</label>
                        <Select
                            isMulti
                            options={SKILL_OPTIONS}
                            onChange={handleSkillsChange}
                            placeholder="Select skills"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Description</label>
                        <textarea
                            placeholder="What will students learn?"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isUploadingImage}
                        className={styles.btn}
                    >
                        {isSubmitting ? "Creating..." : "Create Course"}
                    </button>

                </form>
            </div>
        </div>

    )
}

export default CreateCourse;