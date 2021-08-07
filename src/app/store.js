import { configureStore } from '@reduxjs/toolkit'
import organizationsReducer from './organizationsSlice'
import packagesReducer from './packagesSlice'
import profilesReducer from './profilesSlice'
import schedulesReducer from './schedulesSlice'
import participantsReducer from './participantsSlice'
import sectionsReducer from './sectionsSlice'
import questionsReducer from './questionsSlice'
import answersReducer from './answersSlice'

export default configureStore({
  reducer: {
    organizations: organizationsReducer,
    packages: packagesReducer,
    profiles: profilesReducer,
    schedules: schedulesReducer,
    participants: participantsReducer,
    sections: sectionsReducer,
    questions: questionsReducer,
    answers: answersReducer,
  },
})
