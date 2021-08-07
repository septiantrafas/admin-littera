import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  profileList: [],
  profileListStatus: 'idle',
  profileListError: null,
  profileById: [],
  profileByIdStatus: 'idle',
  profileByIdError: null,
  createProfile: [],
  createProfileStatus: 'idle',
  createProfileError: null,
  profileDelete: [],
  profileDeleteStatus: 'idle',
  profileDeleteError: null,
  profileUpdate: [],
  profileUpdateStatus: 'idle',
  profileUpdateError: null,
}

export const fetchProfile = createAsyncThunk(
  'profiles/fetchProfile',
  async () => {
    const response = await supabase.from('profiles').select()
    return response
  },
)

export const fetchProfileById = createAsyncThunk(
  'profiles/fetchProfileById',
  async (id) => {
    const response = await supabase.from('profiles').select('*').eq('id', id)
    return response
  },
)

export const createNewProfile = createAsyncThunk(
  'profiles/createNewProfile',
  async (data) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })
    console.log(user)
    data.id = user.id
    const response = await supabase.from('profiles').insert([data])
    if (response.error) {
      alert(response.error.message)
    }
    return response
  },
)

export const deleteProfile = createAsyncThunk(
  'profiles/deleteProfile',
  async (id) => {
    await supabase.from('profiles').delete().match({ id: id })
    return id
  },
)

export const updateProfile = createAsyncThunk(
  'profiles/updateProfile',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        address: updatedData.address,
        email: updatedData.email,
        name: updatedData.name,
        phone: updatedData.phone,
        pic_name: updatedData.pic_name,
      })
      .eq('id', updatedData.id)
    // if (error) return error
    return data
  },
)

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    clearProfileByIdData: (state) => {
      state.profileById = []
    },
    clearProfileByIdStatus: (state) => {
      state.profileByIdStatus = 'idle'
    },
    clearProfileDeleteStatus: (state) => {
      state.profileDeleteStatus = 'idle'
    },
    clearCreateProfileStatus: (state) => {
      state.createProfileStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchProfile.pending]: (state) => {
      state.profileListStatus = 'loading'
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.profileListStatus = 'succeeded'
      state.profileList = state.profileList.concat(action.payload.data)
    },
    [fetchProfile.rejected]: (state, action) => {
      state.profileListStatus = 'failed'
      state.profileListError = action.error.message
    },
    [fetchProfileById.pending]: (state) => {
      state.profileByIdStatus = 'loading'
    },
    [fetchProfileById.fulfilled]: (state, action) => {
      state.profileByIdStatus = 'succeeded'
      state.profileById = action.payload.data[0]
    },
    [fetchProfileById.rejected]: (state, action) => {
      state.profileByIdStatus = 'failed'
      state.profileByIdError = action.error.message
    },
    [createNewProfile.pending]: (state) => {
      state.createProfileStatus = 'loading'
    },
    [createNewProfile.fulfilled]: (state, action) => {
      state.createProfileStatus = 'succeeded'
      state.profileList = state.profileList.concat(action.payload.data[0])
    },
    [createNewProfile.rejected]: (state, action) => {
      state.createProfileStatus = 'failed'
      state.createProfileError = action.error.message
    },
    [deleteProfile.pending]: (state) => {
      state.profileDeleteStatus = 'loading'
    },
    [deleteProfile.fulfilled]: (state, action) => {
      state.profileDeleteStatus = 'succeeded'
      state.profileDelete = action.payload.data
      const array = current(state.profileList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.profileList = temp
    },
    [deleteProfile.rejected]: (state, action) => {
      state.profileDeleteStatus = 'failed'
      state.profileDeleteError = action.error.message
    },
    [updateProfile.pending]: (state) => {
      state.profileUpdateStatus = 'loading'
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profileUpdateStatus = 'succeeded'
      state.profileUpdate = action.payload.data
    },
    [updateProfile.rejected]: (state, action) => {
      state.profileUpdateStatus = 'failed'
      state.profileUpdateError = action.error.message
    },
  },
})

export const {
  clearProfileByIdData,
  clearProfileByIdStatus,
  clearProfileDeleteStatus,
  clearCreateProfileStatus,
} = profilesSlice.actions

export default profilesSlice.reducer
