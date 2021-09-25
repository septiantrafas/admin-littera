const roles = [
  {
    role: 'super_admin',
    routes: [
      {
        path: '/app/organizations',
        icon: 'PeopleIcon',
        name: 'Organizations',
      },
      {
        path: '/app/exam',
        icon: 'CardsIcon',
        name: 'Exam',
      },
      {
        path: '/app/qbank',
        icon: 'ChartsIcon',
        name: 'Question bank',
      },
      {
        path: '/app/report',
        icon: 'FormsIcon',
        name: 'Report',
      },
      {
        path: '/app/profiles',
        icon: 'PeopleIcon',
        name: 'Profiles',
      },
    ],
  },
  {
    role: 'proctor',
    routes: [
      {
        path: '/app/exam',
        icon: 'CardsIcon',
        name: 'Exam',
      },
    ],
  },
]

export default roles
