import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import { PeopleIcon } from '../icons'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import SectionTitle from '../components/Typography/SectionTitle'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, fetchProfile } from '../app/profilesSlice'

function Profiles() {
  const dispatch = useDispatch()
  const buttonPrf = (
    <Button size="small" tag={Link} to="/app/profiles/create-profile">
      + new profile
    </Button>
  )

  const response = useSelector((state) => state.profiles.profileList)
  const profileListStatus = useSelector(
    (state) => state.profiles.profileListStatus,
  )

  useEffect(() => {
    if (profileListStatus === 'idle') {
      dispatch(fetchProfile())
    }
  }, [profileListStatus, dispatch])

  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState([])
  const resultsPerPage = 10
  const totalResults = response.length

  function onPageChangeTable2(p) {
    setPageTable(p)
  }

  function removeProfile(id) {
    dispatch(deleteProfile(id))
  }

  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage,
      ),
    )
  }, [response, pageTable])
  return (
    <>
      <PageTitle>
        <div className="flex justify-between">
          <div>Profiles</div>
          <div className="float-right">{buttonPrf}</div>
        </div>
      </PageTitle>
      <hr className="mb-4" />
      <SectionTitle>Profile list</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Display name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Identity</TableCell>
              <TableCell>Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{data.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400"></p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.gender}</span>
                </TableCell>
                <TableCell>
                  <span>{data.identity}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.birth_date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.address}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.role}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => removeProfile(data.id)}
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
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Profiles
