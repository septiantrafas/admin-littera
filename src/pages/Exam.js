import React, { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import { PeopleIcon } from '../icons'
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'
import { Link } from 'react-router-dom'
import CreateParticipants from './CreateParticipants'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSchedule, fetchSchedule } from '../app/schedulesSlice'
import { deleteParticipant, fetchParticipant } from '../app/participantsSlice'
// make a copy of the data, for the second table

function ParticipantTable() {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.participants.participantList)
  const participantListStatus = useSelector(
    (state) => state.participants.participantListStatus,
  )

  useEffect(() => {
    if (participantListStatus === 'idle') {
      dispatch(fetchParticipant())
    }
  }, [participantListStatus, dispatch])

  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState([])
  const resultsPerPage = 7
  const totalResults = response.length
  function onPageChangeTable(p) {
    setPageTable(p)
  }
  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage,
      ),
    )
  }, [pageTable, response])
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Schedule date</TableCell>
              <TableCell>Profile name</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">
                        {user.schedules.exam_date}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.profiles.name}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(deleteParticipant(user.id))
                      }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

function Exam() {
  const [link, setLink] = useState('schedules')
  const [newPartBox, setNewPartBox] = useState(false)

  const buttonSch = (
    <Button size="small" tag={Link} to="/app/exam/create-schedule">
      + new schedule
    </Button>
  )

  const buttonPrt = (
    <Button
      size="small"
      onClick={() => {
        setNewPartBox(!newPartBox)
      }}
    >
      + new participant
    </Button>
  )

  return (
    <>
      <PageTitle>
        <div className="flex justify-between">
          <div>Exam</div>
          <div className="float-right">
            {link === 'schedules' ? buttonSch : buttonPrt}
          </div>
        </div>
      </PageTitle>
      <hr />

      <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-4 ">
        <div
          onClick={() => {
            setLink('schedules')
          }}
          className="cursor-pointer"
        >
          <InfoCard title="Schedule" value="10">
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
        <div
          onClick={() => {
            setLink('participants')
          }}
          className="cursor-pointer"
        >
          <InfoCard title="Participants" value="1000">
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
      </div>

      <div className="mt-4">{newPartBox ? <CreateParticipants /> : ''}</div>
      <SectionTitle>
        {link === 'schedules' ? 'Schedule list' : 'Participant list'}
      </SectionTitle>

      {link === 'schedules' ? <ScheduleTable /> : <ParticipantTable />}
    </>
  )
}

export default Exam

function ScheduleTable() {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.schedules.scheduleList)
  const scheduleListStatus = useSelector(
    (state) => state.schedules.scheduleListStatus,
  )

  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState([])
  const resultsPerPage = 7
  const totalResults = response.length

  useEffect(() => {
    if (scheduleListStatus === 'idle') {
      dispatch(fetchSchedule())
    }
  }, [scheduleListStatus, dispatch])

  function onPageChangeTable(p) {
    setPageTable(p)
  }

  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage,
      ),
    )
  }, [pageTable, response])

  return (
    <>
      <TableContainer className="mb-8 w-full">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Package</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Exam date</TableCell>
              <TableCell>Zoom url</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.packages.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.organizations.name}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.exam_date}</span>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.url}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(deleteSchedule(user.id))
                      }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}
