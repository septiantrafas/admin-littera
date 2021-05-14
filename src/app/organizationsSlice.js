import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { createClient } from '@supabase/supabase-js'
const { REACT_APP_SUPABASE_KEY, REACT_APP_SUPABASE_URL } = process.env
const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY)

const initialState = {
  organizationList: [],
  organizationListStatus: 'idle',
  organizationListError: null,
  organizationById: [],
  organizationByIdStatus: 'idle',
  organizationByIdError: null,
  createOrganization: [],
  createOrganizationStatus: 'idle',
  createOrganizationError: null,
  organizationDelete: [],
  organizationDeleteStatus: 'idle',
  organizationDeleteError: null,
  organizationUpdate: [],
  organizationUpdateStatus: 'idle',
  organizationUpdateError: null,
}

export const fetchOrganization = createAsyncThunk(
  'organizations/fetchOrganization',
  async () => {
    const response = await supabase.from('organizations').select()
    return response
  },
)

export const fetchOrganizationById = createAsyncThunk(
  'organizations/fetchOrganizationById',
  async (id) => {
    const response = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
    return response
  },
)

export const createNewOrganization = createAsyncThunk(
  'organizations/createNewOrganization',
  async (data) => {
    const response = await supabase.from('organizations').insert([data])
    return response
  },
)

export const deleteOrganization = createAsyncThunk(
  'organizations/deleteOrganization',
  async (id) => {
    await supabase.from('organizations').delete().match({ id: id })
    return id
  },
)

export const updateOrganization = createAsyncThunk(
  'organizations/updateOrganization',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('organizations')
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

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    clearOrganizationByIdData: (state) => {
      state.organizationById = []
    },
    clearOrganizationByIdStatus: (state) => {
      state.organizationByIdStatus = 'idle'
    },
    clearOrganizationDeleteStatus: (state) => {
      state.organizationDeleteStatus = 'idle'
    },
    clearCreateOrganizationStatus: (state) => {
      state.createOrganizationStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchOrganization.pending]: (state) => {
      state.organizationListStatus = 'loading'
    },
    [fetchOrganization.fulfilled]: (state, action) => {
      state.organizationListStatus = 'succeeded'
      state.organizationList = state.organizationList.concat(
        action.payload.data,
      )
    },
    [fetchOrganization.rejected]: (state, action) => {
      state.organizationListStatus = 'failed'
      state.organizationListError = action.error.message
    },
    [fetchOrganizationById.pending]: (state) => {
      state.organizationByIdStatus = 'loading'
    },
    [fetchOrganizationById.fulfilled]: (state, action) => {
      state.organizationByIdStatus = 'succeeded'
      state.organizationById = action.payload.data[0]
    },
    [fetchOrganizationById.rejected]: (state, action) => {
      state.organizationByIdStatus = 'failed'
      state.organizationByIdError = action.error.message
    },
    [createNewOrganization.pending]: (state) => {
      state.createOrganizationStatus = 'loading'
    },
    [createNewOrganization.fulfilled]: (state, action) => {
      state.createOrganizationStatus = 'succeeded'
      state.organizationList = state.organizationList.concat(
        action.payload.data[0],
      )
    },
    [createNewOrganization.rejected]: (state, action) => {
      state.createOrganizationStatus = 'failed'
      state.createOrganizationError = action.error.message
    },
    [deleteOrganization.pending]: (state) => {
      state.organizationDeleteStatus = 'loading'
    },
    [deleteOrganization.fulfilled]: (state, action) => {
      state.organizationDeleteStatus = 'succeeded'
      state.organizationDelete = action.payload.data
      const array = current(state.organizationList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.organizationList = temp
    },
    [deleteOrganization.rejected]: (state, action) => {
      state.organizationDeleteStatus = 'failed'
      state.organizationDeleteError = action.error.message
    },
    [updateOrganization.pending]: (state) => {
      state.organizationUpdateStatus = 'loading'
    },
    [updateOrganization.fulfilled]: (state, action) => {
      state.organizationUpdateStatus = 'succeeded'
      state.organizationUpdate = action.payload.data
    },
    [updateOrganization.rejected]: (state, action) => {
      state.organizationUpdateStatus = 'failed'
      state.organizationUpdateError = action.error.message
    },
  },
})

export const {
  clearOrganizationByIdData,
  clearOrganizationByIdStatus,
  clearOrganizationDeleteStatus,
  clearCreateOrganizationStatus,
} = organizationsSlice.actions

export default organizationsSlice.reducer
