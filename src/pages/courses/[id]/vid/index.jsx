import Navbar from '@/components/Navbar'
import { getVideos } from '@/config/redux/action/courseAction'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./style.module.css"
import { toast } from 'react-toastify';
import { clearCourseError } from '@/config/redux/reducer/courseReducer';

const index = () => {
    const router = useRouter()
    const { id } = router.query;
    const dispatch = useDispatch();
    const { videos, isLoadingVideos,error } = useSelector(s => s.courses);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(()=>{
      if(error){
        router.replace(`/courses/${id}`);
        dispatch(clearCourseError());
        toast.error(error.message)
      }
    },[error]);

    useEffect(() => {
        if (id) {
            dispatch(getVideos(id));
        }
    }, [dispatch,id]);

    useEffect(() => {
        if (videos?.length) {
            setActiveVideo(videos[0])
        }
    }, [dispatch,videos])
    return (
        <>
        <Navbar />

      {isLoadingVideos ? (
        <div className={styles.loading}>Loading course content...</div>
      ) : (
        <div className={styles.page}>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>Course Content</div>

            {videos?.map((video, idx) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`${styles.videoItem} ${
                  activeVideo?.id === video.id ? styles.activeVideo : ''
                }`}
              >
                {idx + 1}. {video.title}
              </div>
            ))}
          </aside>

          <main className={styles.main}>
            {activeVideo ? (
              <>
                <video
                  src={activeVideo.videoUrl}
                  controls
                  className={styles.videoPlayer}
                />

                <div className={styles.videoTitle}>
                  {activeVideo.title}
                </div>
              </>
            ) : (
              <p>Select a video to start learning</p>
            )}
          </main>

        </div>
      )}
        </>
    )
}

export default index