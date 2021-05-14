import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { createClient } from '@supabase/supabase-js'
const { REACT_APP_SUPABASE_KEY, REACT_APP_SUPABASE_URL } = process.env
const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY)

const initialState = {
  questionList: [],
  questionListStatus: 'idle',
  questionListError: null,
  questionById: [],
  questionByIdStatus: 'idle',
  questionByIdError: null,
  createQuestion: [],
  createQuestionStatus: 'idle',
  createQuestionError: null,
  questionDelete: [],
  questionDeleteStatus: 'idle',
  questionDeleteError: null,
  questionUpdate: [],
  questionUpdateStatus: 'idle',
  questionUpdateError: null,
}

export const fetchQuestion = createAsyncThunk(
  'questions/fetchQuestion',
  async () => {
    const response = await supabase.from('questions').select()
    return response
  },
)

export const fetchQuestionById = createAsyncThunk(
  'questions/fetchQuestionById',
  async (id) => {
    const response = await supabase.from('questions').select('*').eq('id', id)
    return response
  },
)

export const createNewQuestion = createAsyncThunk(
  'questions/createNewQuestion',
  async (data) => {
    const response = await supabase.from('questions').insert([data])
    return response
  },
)

export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestion',
  async (id) => {
    await supabase.from('questions').delete().match({ id: id })
    return id
  },
)

export const updateQuestion = createAsyncThunk(
  'questions/updateQuestion',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('questions')
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

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearQuestionByIdData: (state) => {
      state.questionById = []
    },
    clearQuestionByIdStatus: (state) => {
      state.questionByIdStatus = 'idle'
    },
    clearQuestionDeleteStatus: (state) => {
      state.questionDeleteStatus = 'idle'
    },
    clearCreateQuestionStatus: (state) => {
      state.createQuestionStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchQuestion.pending]: (state) => {
      state.questionListStatus = 'loading'
    },
    [fetchQuestion.fulfilled]: (state, action) => {
      state.questionListStatus = 'succeeded'
      state.questionList = state.questionList.concat(action.payload.data)
    },
    [fetchQuestion.rejected]: (state, action) => {
      state.questionListStatus = 'failed'
      state.questionListError = action.error.message
    },
    [fetchQuestionById.pending]: (state) => {
      state.questionByIdStatus = 'loading'
    },
    [fetchQuestionById.fulfilled]: (state, action) => {
      state.questionByIdStatus = 'succeeded'
      state.questionById = action.payload.data[0]
    },
    [fetchQuestionById.rejected]: (state, action) => {
      state.questionByIdStatus = 'failed'
      state.questionByIdError = action.error.message
    },
    [createNewQuestion.pending]: (state) => {
      state.createQuestionStatus = 'loading'
    },
    [createNewQuestion.fulfilled]: (state, action) => {
      state.createQuestionStatus = 'succeeded'
      state.questionList = state.questionList.concat(action.payload.data[0])
    },
    [createNewQuestion.rejected]: (state, action) => {
      state.createQuestionStatus = 'failed'
      state.createQuestionError = action.error.message
    },
    [deleteQuestion.pending]: (state) => {
      state.questionDeleteStatus = 'loading'
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      state.questionDeleteStatus = 'succeeded'
      state.questionDelete = action.payload.data
      const array = current(state.questionList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.questionList = temp
    },
    [deleteQuestion.rejected]: (state, action) => {
      state.questionDeleteStatus = 'failed'
      state.questionDeleteError = action.error.message
    },
    [updateQuestion.pending]: (state) => {
      state.questionUpdateStatus = 'loading'
    },
    [updateQuestion.fulfilled]: (state, action) => {
      state.questionUpdateStatus = 'succeeded'
      state.questionUpdate = action.payload.data
    },
    [updateQuestion.rejected]: (state, action) => {
      state.questionUpdateStatus = 'failed'
      state.questionUpdateError = action.error.message
    },
  },
})

export const {
  clearQuestionByIdData,
  clearQuestionByIdStatus,
  clearQuestionDeleteStatus,
  clearCreateQuestionStatus,
} = questionsSlice.actions

export default questionsSlice.reducer
