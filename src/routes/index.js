import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
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

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/exam', // the url
    component: Exam, // view rendered
  },
  {
    path: '/exam/create-schedule', // the url
    component: CreateSchedule, // view rendered
  },
  {
    path: '/organizations', // the url
    component: Organizations, // view rendered
  },
  {
    path: '/organizations/create-organization', // the url
    component: CreateOrganization, // view rendered
  },
  {
    path: '/organizations/create-participant', // the url
    component: CreateParticipant, // view rendered
  },
  {
    path: '/qbank', // the url
    component: QBank, // view rendered
  },
  {
    path: '/qbank/create-section', // the url
    component: CreateSection, // view rendered
  },
  {
    path: '/qbank/create-question', // the url
    component: CreateQuestion, // view rendered
  },
  {
    path: '/report', // the url
    component: Report, // view rendered
  },
  {
    path: '/profiles', // the url
    component: Profiles, // view rendered
  },
  {
    path: '/profiles/create-profile', // the url
    component: CreateProfiles, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
