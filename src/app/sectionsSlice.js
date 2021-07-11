import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  sectionList: [],
  sectionListStatus: 'idle',
  sectionListError: null,
  sectionById: [],
  sectionByIdStatus: 'idle',
  sectionByIdError: null,
  sectionByIdPackage: [],
  sectionByIdPackageStatus: 'idle',
  sectionByIdPackageError: null,
  createSection: [],
  createSectionStatus: 'idle',
  createSectionError: null,
  sectionDelete: [],
  sectionDeleteStatus: 'idle',
  sectionDeleteError: null,
  sectionUpdate: [],
  sectionUpdateStatus: 'idle',
  sectionUpdateError: null,
}

export const fetchSection = createAsyncThunk(
  'sections/fetchSection',
  async () => {
    const response = await supabase
      .from('sections')
      .select(`id,package_id,number,titles,context,start_time,end_time`)
    return response
  },
)

export const fetchSectionById = createAsyncThunk(
  'sections/fetchSectionById',
  async (id) => {
    const response = await supabase.from('sections').select('*').eq('id', id)
    return response
  },
)

export const fetchSectionByIdPackage = createAsyncThunk(
  'sections/fetchSectionByIdPackage',
  async (id) => {
    const response = await supabase
      .from('sections')
      .select('*')
      .eq('packages_id', id)
    return response
  },
)

export const createNewSection = createAsyncThunk(
  'sections/createNewSection',
  async (data) => {
    const response = await supabase.from('sections').insert([data])
    return response
  },
)

export const deleteSection = createAsyncThunk(
  'sections/deleteSection',
  async (id) => {
    await supabase.from('sections').delete().match({ id: id })
    return id
  },
)

export const updateSection = createAsyncThunk(
  'sections/updateSection',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('sections')
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

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    clearSectionListStatus: (state) => {
      state.sectionListStatus = 'idle'
    },
    clearSectionByIdData: (state) => {
      state.sectionById = []
    },
    clearSectionByIdStatus: (state) => {
      state.sectionByIdStatus = 'idle'
    },
    clearSectionDeleteStatus: (state) => {
      state.sectionDeleteStatus = 'idle'
    },
    clearCreateSectionStatus: (state) => {
      state.createSectionStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchSection.pending]: (state) => {
      state.sectionListStatus = 'loading'
    },
    [fetchSection.fulfilled]: (state, action) => {
      state.sectionListStatus = 'succeeded'
      state.sectionList = state.sectionList.concat(action.payload.data)
    },
    [fetchSection.rejected]: (state, action) => {
      state.sectionListStatus = 'failed'
      state.sectionListError = action.error.message
    },
    [fetchSectionById.pending]: (state) => {
      state.sectionByIdStatus = 'loading'
    },
    [fetchSectionById.fulfilled]: (state, action) => {
      state.sectionByIdStatus = 'succeeded'
      state.sectionById = action.payload.data
    },
    [fetchSectionById.rejected]: (state, action) => {
      state.sectionByIdStatus = 'failed'
      state.sectionByIdError = action.error.message
    },
    [fetchSectionByIdPackage.pending]: (state) => {
      state.sectionByIdPackageStatus = 'loading'
    },
    [fetchSectionByIdPackage.fulfilled]: (state, action) => {
      state.sectionByIdPackageStatus = 'succeeded'
      state.sectionByIdPackage = action.payload.data
    },
    [fetchSectionByIdPackage.rejected]: (state, action) => {
      state.sectionByIdPackageStatus = 'failed'
      state.sectionByIdPackageError = action.error.message
    },
    [createNewSection.pending]: (state) => {
      state.createSectionStatus = 'loading'
    },
    [createNewSection.fulfilled]: (state, action) => {
      state.createSectionStatus = 'succeeded'
      state.sectionList = state.sectionList.concat(action.payload.data[0])
    },
    [createNewSection.rejected]: (state, action) => {
      state.createSectionStatus = 'failed'
      state.createSectionError = action.error.message
    },
    [deleteSection.pending]: (state) => {
      state.sectionDeleteStatus = 'loading'
    },
    [deleteSection.fulfilled]: (state, action) => {
      state.sectionDeleteStatus = 'succeeded'
      state.sectionDelete = action.payload.data
      const array = current(state.sectionList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.sectionList = temp
    },
    [deleteSection.rejected]: (state, action) => {
      state.sectionDeleteStatus = 'failed'
      state.sectionDeleteError = action.error.message
    },
    [updateSection.pending]: (state) => {
      state.sectionUpdateStatus = 'loading'
    },
    [updateSection.fulfilled]: (state, action) => {
      state.sectionUpdateStatus = 'succeeded'
      state.sectionUpdate = action.payload.data
    },
    [updateSection.rejected]: (state, action) => {
      state.sectionUpdateStatus = 'failed'
      state.sectionUpdateError = action.error.message
    },
  },
})

export const {
  clearSectionListStatus,
  clearSectionByIdData,
  clearSectionByIdStatus,
  clearSectionDeleteStatus,
  clearCreateSectionStatus,
} = sectionsSlice.actions

export default sectionsSlice.reducer
