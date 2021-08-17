import { lazy } from 'react'

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
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/exam/create-schedule',
    component: CreateSchedule,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/exam/edit-schedule/:id',
    component: CreateSchedule,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/organizations',
    component: Organizations,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/organizations/create-organization',
    component: CreateOrganization,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/organizations/edit-organization/:id',
    component: CreateOrganization,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/organizations/create-participant',
    component: CreateParticipant,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/organizations/edit-participant/:id',
    component: CreateParticipant,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/qbank',
    component: QBank,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/qbank/create-section',
    component: CreateSection,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/qbank/edit-section/:id',
    component: CreateSection,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/qbank/create-question',
    component: CreateQuestion,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/qbank/edit-question/:id',
    component: EditQuestions,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/report',
    component: Report,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/profiles',
    component: Profiles,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/profiles/create-profile',
    component: CreateProfiles,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/profiles/edit-profile',
    component: CreateProfiles,
    roles: ['supabase_admin', 'proctor'],
  },
  {
    path: '/forms',
    component: Forms,
    roles: ['supabase_admin', 'proctor'],
  },
]

export default routes
