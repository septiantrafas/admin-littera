import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  packageList: [],
  packageListStatus: 'idle',
  packageListError: null,
  packageById: [],
  packageByIdStatus: 'idle',
  packageByIdError: null,
  createPackage: [],
  createPackageStatus: 'idle',
  createPackageError: null,
  packageDelete: [],
  packageDeleteStatus: 'idle',
  packageDeleteError: null,
  packageUpdate: [],
  packageUpdateStatus: 'idle',
  packageUpdateError: null,
}

export const fetchPackage = createAsyncThunk(
  'packages/fetchPackage',
  async () => {
    const response = await supabase.from('packages').select()
    return response
  },
)

export const fetchPackageById = createAsyncThunk(
  'packages/fetchPackageById',
  async (id) => {
    const response = await supabase.from('packages').select('*').eq('id', id)
    return response
  },
)

export const createNewPackage = createAsyncThunk(
  'packages/createNewPackage',
  async (data) => {
    const response = await supabase.from('packages').insert([data])
    return response
  },
)

export const deletePackage = createAsyncThunk(
  'packages/deletePackage',
  async (id) => {
    await supabase.from('packages').delete().match({ id: id })
    return id
  },
)

export const updatePackage = createAsyncThunk(
  'packages/updatePackage',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('packages')
      .update({
        address: updatedData.address,
        email: updatedData.email,
        name: updatedData.name,
        phone: updatedData.phone,
        pic_name: updatedData.pic_name,
      })
      .eq('id', updatedData.id)
    if (error) {
      return error
    }
    return data
  },
)

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    clearPackageListStatus: (state) => {
      state.packageListStatus = 'idle'
    },
    clearPackageByIdData: (state) => {
      state.packageById = []
    },

    clearPackageByIdStatus: (state) => {
      state.packageByIdStatus = 'idle'
    },
    clearPackageDeleteStatus: (state) => {
      state.packageDeleteStatus = 'idle'
    },
    clearCreatePackageStatus: (state) => {
      state.createPackageStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchPackage.pending]: (state) => {
      state.packageListStatus = 'loading'
    },
    [fetchPackage.fulfilled]: (state, action) => {
      state.packageListStatus = 'succeeded'
      state.packageList = action.payload.data
    },
    [fetchPackage.rejected]: (state, action) => {
      state.packageListStatus = 'failed'
      state.packageListError = action.error.message
    },
    [fetchPackageById.pending]: (state) => {
      state.packageByIdStatus = 'loading'
    },
    [fetchPackageById.fulfilled]: (state, action) => {
      state.packageByIdStatus = 'succeeded'
      state.packageById = action.payload.data[0]
    },
    [fetchPackageById.rejected]: (state, action) => {
      state.packageByIdStatus = 'failed'
      state.packageByIdError = action.error.message
    },
    [createNewPackage.pending]: (state) => {
      state.createPackageStatus = 'loading'
    },
    [createNewPackage.fulfilled]: (state, action) => {
      state.createPackageStatus = 'succeeded'
      state.packageList = state.packageList.concat(action.payload.data[0])
    },
    [createNewPackage.rejected]: (state, action) => {
      state.createPackageStatus = 'failed'
      state.createPackageError = action.error.message
    },
    [deletePackage.pending]: (state) => {
      state.packageDeleteStatus = 'loading'
    },
    [deletePackage.fulfilled]: (state, action) => {
      state.packageDeleteStatus = 'succeeded'
      state.packageDelete = action.payload.data
      const array = current(state.packageList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.packageList = temp
    },
    [deletePackage.rejected]: (state, action) => {
      state.packageDeleteStatus = 'failed'
      state.packageDeleteError = action.error.message
    },
    [updatePackage.pending]: (state) => {
      state.packageUpdateStatus = 'loading'
    },
    [updatePackage.fulfilled]: (state, action) => {
      state.packageUpdateStatus = 'succeeded'
      state.packageUpdate = action.payload.data
    },
    [updatePackage.rejected]: (state, action) => {
      state.packageUpdateStatus = 'failed'
      state.packageUpdateError = action.error.message
    },
  },
})

export const {
  clearPackageListStatus,
  clearPackageByIdData,
  clearPackageByIdStatus,
  clearPackageDeleteStatus,
  clearCreatePackageStatus,
} = packagesSlice.actions

export default packagesSlice.reducer
