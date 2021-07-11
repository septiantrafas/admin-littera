import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  questionList: [],
  questionListStatus: 'idle',
  questionListError: null,
  questionBySectionId: [],
  questionBySectionIdStatus: 'idle',
  questionBySectionIdError: null,
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

export const fetchQuestionBySectionId = createAsyncThunk(
  'questions/fetchQuestionBySectionId',
  async (id) => {
    const response = await supabase
      .from('questions')
      .select('*')
      .eq('sections_id', id)
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
        text: updatedData.text,
        question: updatedData.question,
        options: updatedData.options,
        keys: updatedData.keys,
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
    clearQuestionListStatus: (state) => {
      state.questionListStatus = 'idle'
    },
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
    clearQuestionBySectionIdStatus: (state) => {
      state.questionBySectionIdStatus = 'idle'
    },
    clearQuestionUpdateStatus: (state) => {
      state.questionUpdateStatus = 'idle'
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
    [fetchQuestionBySectionId.pending]: (state) => {
      state.questionBySectionIdStatus = 'loading'
    },
    [fetchQuestionBySectionId.fulfilled]: (state, action) => {
      state.questionBySectionIdStatus = 'succeeded'
      if (action.payload.error) {
        state.questionBySectionId = []
      } else {
        state.questionBySectionId = action.payload.data
      }
    },
    [fetchQuestionBySectionId.rejected]: (state, action) => {
      state.questionBySectionIdStatus = 'failed'
      state.questionBySectionIdError = action.error.message
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
  clearQuestionListStatus,
  clearQuestionByIdData,
  clearQuestionByIdStatus,
  clearQuestionDeleteStatus,
  clearCreateQuestionStatus,
  clearQuestionBySectionIdStatus,
  clearQuestionUpdateStatus,
} = questionsSlice.actions

export default questionsSlice.reducer
