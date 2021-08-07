import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  answerList: [],
  answerListStatus: 'idle',
  answerListError: null,
  answerById: [],
  answerByIdStatus: 'idle',
  answerByIdError: null,
  createAnswer: [],
  createAnswerStatus: 'idle',
  createAnswerError: null,
  answerDelete: [],
  answerDeleteStatus: 'idle',
  answerDeleteError: null,
  answerUpdate: [],
  answerUpdateStatus: 'idle',
  answerUpdateError: null,
}

export const fetchAnswer = createAsyncThunk('answers/fetchAnswer', async () => {
  const response = await supabase.from('answers').select()
  return response
})

export const fetchAnswerById = createAsyncThunk(
  'answers/fetchAnswerById',
  async (id) => {
    const response = await supabase.from('answers').select('*').eq('id', id)
    return response
  },
)

export const createNewAnswer = createAsyncThunk(
  'answers/createNewAnswer',
  async (data) => {
    const response = await supabase.from('answers').insert([data])
    return response
  },
)

export const deleteAnswer = createAsyncThunk(
  'answers/deleteAnswer',
  async (id) => {
    await supabase.from('answers').delete().match({ id: id })
    return id
  },
)

export const updateAnswer = createAsyncThunk(
  'answers/updateAnswer',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('answers')
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

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    clearAnswerListStatus: (state) => {
      state.answerListStatus = 'idle'
    },
    clearAnswerByIdData: (state) => {
      state.answerById = []
    },

    clearAnswerByIdStatus: (state) => {
      state.answerByIdStatus = 'idle'
    },
    clearAnswerDeleteStatus: (state) => {
      state.answerDeleteStatus = 'idle'
    },
    clearCreateAnswerStatus: (state) => {
      state.createAnswerStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchAnswer.pending]: (state) => {
      state.answerListStatus = 'loading'
    },
    [fetchAnswer.fulfilled]: (state, action) => {
      state.answerListStatus = 'succeeded'
      state.answerList = action.payload.data
    },
    [fetchAnswer.rejected]: (state, action) => {
      state.answerListStatus = 'failed'
      state.answerListError = action.error.message
    },
    [fetchAnswerById.pending]: (state) => {
      state.answerByIdStatus = 'loading'
    },
    [fetchAnswerById.fulfilled]: (state, action) => {
      state.answerByIdStatus = 'succeeded'
      state.answerById = action.payload.data[0]
    },
    [fetchAnswerById.rejected]: (state, action) => {
      state.answerByIdStatus = 'failed'
      state.answerByIdError = action.error.message
    },
    [createNewAnswer.pending]: (state) => {
      state.createAnswerStatus = 'loading'
    },
    [createNewAnswer.fulfilled]: (state, action) => {
      state.createAnswerStatus = 'succeeded'
      state.answerList = state.answerList.concat(action.payload.data[0])
    },
    [createNewAnswer.rejected]: (state, action) => {
      state.createAnswerStatus = 'failed'
      state.createAnswerError = action.error.message
    },
    [deleteAnswer.pending]: (state) => {
      state.answerDeleteStatus = 'loading'
    },
    [deleteAnswer.fulfilled]: (state, action) => {
      state.answerDeleteStatus = 'succeeded'
      state.answerDelete = action.payload.data
      const array = current(state.answerList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.answerList = temp
    },
    [deleteAnswer.rejected]: (state, action) => {
      state.answerDeleteStatus = 'failed'
      state.answerDeleteError = action.error.message
    },
    [updateAnswer.pending]: (state) => {
      state.answerUpdateStatus = 'loading'
    },
    [updateAnswer.fulfilled]: (state, action) => {
      state.answerUpdateStatus = 'succeeded'
      state.answerUpdate = action.payload.data
    },
    [updateAnswer.rejected]: (state, action) => {
      state.answerUpdateStatus = 'failed'
      state.answerUpdateError = action.error.message
    },
  },
})

export const {
  clearAnswerListStatus,
  clearAnswerByIdData,
  clearAnswerByIdStatus,
  clearAnswerDeleteStatus,
  clearCreateAnswerStatus,
} = answersSlice.actions

export default answersSlice.reducer
