import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  participantList: [],
  participantListStatus: 'idle',
  participantListError: null,
  participantById: [],
  participantByIdStatus: 'idle',
  participantByIdError: null,
  createParticipant: [],
  createParticipantStatus: 'idle',
  createParticipantError: null,
  participantDelete: [],
  participantDeleteStatus: 'idle',
  participantDeleteError: null,
  participantUpdate: [],
  participantUpdateStatus: 'idle',
  participantUpdateError: null,
  totalParticipant: 0,
  totalParticipantStatus:'idle',
}

export const fetchParticipant = createAsyncThunk(
  'participants/fetchParticipant',
  async () => {
    const response = await supabase
      .from('participants')
      .select(`*,schedule_id(*),profile_id(*)`)
    return response
  },
)

export const countParticipant = createAsyncThunk(
  'participants/countParticipant',
  async () => {
    const { count } = await supabase
      .from('participants')
      .select(`id`,{count:'exact'})
    return count
  },
)


export const fetchParticipantById = createAsyncThunk(
  'participants/fetchParticipantById',
  async (id) => {
    const response = await supabase
      .from('participants')
      .select('*')
      .eq('id', id)
    return response
  },
)

export const createNewParticipant = createAsyncThunk(
  'participants/createNewParticipant',
  async (data) => {
    const response = await supabase.from('participants').insert([data])
    return response
  },
)

export const deleteParticipant = createAsyncThunk(
  'participants/deleteParticipant',
  async (id) => {
    await supabase.from('participants').delete().match({ id: id })
    return id
  },
)

export const updateParticipant = createAsyncThunk(
  'participants/updateParticipant',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('participants')
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

export const updateStatusOnline = createAsyncThunk(
  'participants/updateStatusOnline',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('participants')
      .update({
       status: 'online'
      })
      .eq('id', updatedData)
    return data
  },
)

export const updateStatusBanned = createAsyncThunk(
  'participants/updateStatusBanned',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('participants')
      .update({
       status: 'banned'
      })
      .eq('id', updatedData)
    return data
  },
)

export const updateStatusDone = createAsyncThunk(
  'participants/updateStatusDone',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('participants')
      .update({
       status: 'done'
      })
      .eq('id', updatedData)
    return data
  },
)




const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    clearParticipantByIdData: (state) => {
      state.participantById = []
    },
    clearParticipantByIdStatus: (state) => {
      state.participantByIdStatus = 'idle'
    },
    clearParticipantDeleteStatus: (state) => {
      state.participantDeleteStatus = 'idle'
    },
    clearCreateParticipantStatus: (state) => {
      state.createParticipantStatus = 'idle'
    },
    clearTotalParticipantStatus:(state)=>{
      state.totalParticipantStatus = 'idle'
    }
  },
  extraReducers: {
    [countParticipant.pending]:(state)=>{
      state.totalParticipantStatus = 'loading'
    },
    [countParticipant.fulfilled]:(state,action)=>{
      state.totalParticipant = action.payload
      state.totalParticipantStatus = 'succeeded'
    },
    [countParticipant.rejected]:(state)=>{
      state.totalParticipantStatus = 'failed'
    },
    
    [fetchParticipant.pending]: (state) => {
      state.participantListStatus = 'loading'
    },
    [fetchParticipant.fulfilled]: (state, action) => {
      state.participantListStatus = 'succeeded'
      state.participantList = state.participantList.concat(action.payload.data)
    },
    [fetchParticipant.rejected]: (state, action) => {
      state.participantListStatus = 'failed'
      state.participantListError = action.error.message
    },
    [fetchParticipantById.pending]: (state) => {
      state.participantByIdStatus = 'loading'
    },
    [fetchParticipantById.fulfilled]: (state, action) => {
      state.participantByIdStatus = 'succeeded'
      state.participantById = action.payload.data[0]
    },
    [fetchParticipantById.rejected]: (state, action) => {
      state.participantByIdStatus = 'failed'
      state.participantByIdError = action.error.message
    },
    [createNewParticipant.pending]: (state) => {
      state.createParticipantStatus = 'loading'
    },
    [createNewParticipant.fulfilled]: (state, action) => {
      state.createParticipantStatus = 'succeeded'
      state.participantList = state.participantList.concat(
        action.payload.data[0],
      )
    },
    [createNewParticipant.rejected]: (state, action) => {
      state.createParticipantStatus = 'failed'
      state.createParticipantError = action.error.message
    },
    [deleteParticipant.pending]: (state) => {
      state.participantDeleteStatus = 'loading'
    },
    [deleteParticipant.fulfilled]: (state, action) => {
      state.participantDeleteStatus = 'succeeded'
      state.participantDelete = action.payload.data
      const array = current(state.participantList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.participantList = temp
    },
    [deleteParticipant.rejected]: (state, action) => {
      state.participantDeleteStatus = 'failed'
      state.participantDeleteError = action.error.message
    },
    [updateParticipant.pending]: (state) => {
      state.participantUpdateStatus = 'loading'
    },
    [updateParticipant.fulfilled]: (state, action) => {
      state.participantUpdateStatus = 'succeeded'
      state.participantUpdate = action.payload.data
    },
    [updateParticipant.rejected]: (state, action) => {
      state.participantUpdateStatus = 'failed'
      state.participantUpdateError = action.error.message
    },
  },
})

export const {
  clearParticipantByIdData,
  clearParticipantByIdStatus,
  clearParticipantDeleteStatus,
  clearCreateParticipantStatus,
} = participantsSlice.actions

export default participantsSlice.reducer
