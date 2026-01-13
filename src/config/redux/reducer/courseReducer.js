import { updateTag } from "next/cache";
import { addNewCourse, fetchCourseById, fetchMyCourses, fetchPublishedCourses, getVideos, publishCourse, unpublishCourse, uploadCourseVid } from "../action/courseAction";
import { handleEnrollment } from "../action/enrollmentAction";
import { createSlice } from "@reduxjs/toolkit";
import { accessedDynamicData } from "next/dist/server/app-render/dynamic-rendering";

const initialState = {
    myCourses: [],
    publishedCourses: [],
    videos: [],

    isFetching: false,
    isUpdating: false,
    isLoadingVideos: false,

    error: null
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        clearCourseError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyCourses.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(fetchMyCourses.fulfilled, (state, action) => {
                state.isFetching = false;
                state.myCourses = action.payload;
            })
            .addCase(fetchMyCourses.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload || "Failed to fetch courses";
            });

        builder
            .addCase(fetchPublishedCourses.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(fetchPublishedCourses.fulfilled, (state, action) => {
                state.isFetching = false;
                state.publishedCourses = action.payload;
            })
            .addCase(fetchPublishedCourses.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload || "Failed to fetch published courses";
            });

        builder
            .addCase(fetchCourseById.pending, (state, action) => {
                state.isFetching = true;
            })

            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.isFetching = false;
                state.selectedCourse = action.payload;
            })

            .addCase(fetchCourseById.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload || "Some Error Occured"
            })

        builder
            .addCase(publishCourse.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(publishCourse.fulfilled, (state, action) => {
                state.isUpdating = false;
                const updated = action.payload;

                const course = state.myCourses.find(
                    c => c.id === updated.id
                );

                if (course) {
                    course.status = updated.status;
                }
            })
            .addCase(publishCourse.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload || "Failed to publish course";
            });


        builder
            .addCase(unpublishCourse.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(unpublishCourse.fulfilled, (state, action) => {
                state.isUpdating = false;
                const updated = action.payload;
                const course = state.myCourses.find(
                    c => c.id === updated.id
                );

                if (course) {
                    course.status = updated.status;
                }
            })
            .addCase(unpublishCourse.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload || "Failed to unpublish course";
            });


        builder
            .addCase(getVideos.pending, (state) => {
                state.isLoadingVideos = true;
                state.error = null;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.isLoadingVideos = false;
                state.videos = action.payload;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.isLoadingVideos = false;
                state.error = action.payload || "Failed to load videos";
            });
    }
})

export const { clearCourseError } = courseSlice.actions;
export default courseSlice.reducer;