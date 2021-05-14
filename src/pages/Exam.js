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
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/tableData'
import { Link } from 'react-router-dom'
import CreateParticipants from './CreateParticipants'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Exam() {
  const [link, setLink] = useState('schedules')
  const [newPartBox, setNewPartBox] = useState(false)
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])
  const resultsPerPage = 7
  const totalResults = response.length

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

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  useEffect(() => {
    setDataTable2(
      response2.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage,
      ),
    )
  }, [pageTable2])

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

      <TableContainer className="mb-8">
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
            {dataTable2.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.job}
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
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.job}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
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
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Exam
