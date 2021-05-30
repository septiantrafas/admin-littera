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
import {
  deleteOrganization,
  fetchOrganization,
} from '../app/organizationsSlice'

// make a copy of the data, for the second table

function Proctor() {
  const dispatch = useDispatch()
  const buttonOrg = (
    <Button size="small" tag={Link} to="/app/organizations/create-organization">
      + new proctor
    </Button>
  )
  const response = useSelector((state) => state.organizations.organizationList)
  const organizationListStatus = useSelector(
    (state) => state.organizations.organizationListStatus,
  )

  useEffect(() => {
    if (organizationListStatus === 'idle') {
      dispatch(fetchOrganization())
    }
  }, [organizationListStatus, dispatch])

  const [pageTable, setPageTable] = useState(1)

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

  function onPageChangeTable(p) {
    setPageTable(p)
  }

  function removeOrganization(id) {
    dispatch(deleteOrganization(id))
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
      {/* <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative "
        role="alert"
      >
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">Something seriously bad happened.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div> */}
      <PageTitle>
        <div className="flex justify-between">
          <div>Proctor</div>
          <div className="float-right">{buttonOrg}</div>
        </div>
      </PageTitle>
      <hr className="mb-4" />
      <SectionTitle>Company list</SectionTitle>
      <TableContainer className="mb-8 ">
        <Table className="min-w-full">
          <TableHeader>
            <tr>
              <TableCell>Company name</TableCell>

              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total participant</TableCell>
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {data.pic_name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.phone}</span>
                </TableCell>
                <TableCell className=" w-1/4">
                  <span className="text-sm truncate ">{data.address}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.total_participant}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => removeOrganization(data.id)}
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

export default Proctor
