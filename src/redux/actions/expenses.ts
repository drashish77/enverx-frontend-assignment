import types, { ADD_EXPENSE, DELETE_EXPENSE } from '../action-types/expenses'


export const addExpense = (data: any) => {
    console.log({ data })
    return {
        type: ADD_EXPENSE,
        data
    }
}

export const deleteExpense = (data: any) => {
    return {
        type: DELETE_EXPENSE,
        data
    }
}

// //fetching job posted by recruiter
// export const fetchRecruiterJobsBegin = (token: any) => ({
//     type: types.FETCH_RECRUITER_JOBS_START,
//     payload: token,
// })
// export const fetchRecruiterJobsSuccess = (token: any) => ({
//     type: types.FETCH_RECRUITER_JOBS_SUCCESS,
//     payload: token,
// })
// export const fetchRecruiterJobsFailure = (error: any) => ({
//     type: types.FETCH_RECRUITER_JOBS_FAILURE,
//     payload: error,
// })

// //post a new job by recruiter
// export const postNewJobBegin = (data: any) => ({
//     type: types.POST_NEW_JOB_START,
//     payload: data,
// })

// export const postNewJobSuccess = (data: any) => ({
//     type: types.POST_NEW_JOB_SUCCESS,
//     payload: data,
// })

// export const postNewJobFailure = (error: any) => ({
//     type: types.POST_NEW_JOB_FAILURE,
//     payload: error,
// })
// export const clearPostNewJob = () => ({
//     type: types.CLEAR_POST_NEW_JOB,
// })

// //apply a job by candidate
// export const applyNewJobBegin = (data: any) => ({
//     type: types.APPLY_NEW_JOB_START,
//     payload: { data },
// })

// export const applyNewJobSuccess = (data: any) => ({
//     type: types.APPLY_NEW_JOB_SUCCESS,
//     payload: { data },
// })

// export const applyNewJobFailure = (error: any) => ({
//     type: types.APPLY_NEW_JOB_FAILURE,
//     payload: { error },
// })
// //fetch all applied job by a candidate
// export const fetchAppliedJobsBegin = (token: any) => ({
//     type: types.FETCH_APPLIED_JOBS_START,
//     payload: token,
// })

// export const fetchAppliedJobsSuccess = (data: any) => ({
//     type: types.FETCH_APPLIED_JOBS_SUCCESS,
//     payload: data,
// })

// export const fetchAppliedJobsFailure = (error: any) => ({
//     type: types.FETCH_APPLIED_JOBS_FAILURE,
//     payload: error,
// })

// //fetch all applied job by a candidate
// export const fetchApplicationForAJobBegin = (data: any) => ({
//     type: types.FETCH_APPLICATIONS_FOR_A_JOB_START,
//     payload: data,
// })

// export const fetchApplicationForAJobSuccess = (data: any) => ({
//     type: types.FETCH_APPLICATIONS_FOR_A_JOB_SUCCESS,
//     payload: data,
// })

// export const fetchApplicationForAJobFailure = (error: any) => ({
//     type: types.FETCH_APPLICATIONS_FOR_A_JOB_FAILURE,
//     payload: error,
// })
