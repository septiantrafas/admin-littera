import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Exam = lazy(() => import('../pages/Exam'))
const Organizations = lazy(() => import('../pages/Organizations'))
const QBank = lazy(() => import('../pages/QBank'))
const Report = lazy(() => import('../pages/Report'))
const CreateSchedule = lazy(() => import('../pages/CreateSchedules.js'))
const CreateOrganization = lazy(() => import('../pages/CreateOrganizations'))
const CreateParticipant = lazy(() => import('../pages/CreateParticipants.js'))
const CreateSection = lazy(() => import('../pages/CreateSections'))
const CreateQuestion = lazy(() => import('../pages/CreateQuestions'))
const Profiles = lazy(() => import('../pages/Profiles'))
const CreateProfiles = lazy(() => import('../pages/CreateProfiles'))
const EditQuestions = lazy(() => import('../pages/EditQuestions'))

const routes = [
  {
    path: '/exam',
    component: Exam,
  },
  {
    path: '/exam/create-schedule',
    component: CreateSchedule,
  },
  {
    path: '/exam/edit-schedule/:id',
    component: CreateSchedule,
  },
  {
    path: '/organizations',
    component: Organizations,
  },
  {
    path: '/organizations/create-organization',
    component: CreateOrganization,
  },
  {
    path: '/organizations/edit-organization/:id',
    component: CreateOrganization,
  },
  {
    path: '/organizations/create-participant',
    component: CreateParticipant,
  },
  {
    path: '/organizations/edit-participant/:id',
    component: CreateParticipant,
  },
  {
    path: '/qbank',
    component: QBank,
  },
  {
    path: '/qbank/create-section',
    component: CreateSection,
  },
  {
    path: '/qbank/edit-section/:id',
    component: CreateSection,
  },
  {
    path: '/qbank/create-question',
    component: CreateQuestion,
  },
  {
    path: '/qbank/edit-question/:id',
    component: EditQuestions,
  },
  {
    path: '/report',
    component: Report,
  },
  {
    path: '/profiles',
    component: Profiles,
  },
  {
    path: '/profiles/create-profile',
    component: CreateProfiles,
  },
  {
    path: '/profiles/edit-profile',
    component: CreateProfiles,
  },
  {
    path: '/forms',
    component: Forms,
  },
]

export default routes
