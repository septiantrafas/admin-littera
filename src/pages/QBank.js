import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import {
  CardsIcon,
  ChartsIcon,
  MenuIcon,
  ModalsIcon,
  PeopleIcon,
} from '../icons'

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
import CreatePackages from '../pages/CreatePackages'
import response from '../utils/demo/tableData'
import SectionTitle from '../components/Typography/SectionTitle'
const response2 = response.concat([])

function Qbank() {
  const [link, setLink] = useState('packages')
  const [boxCreatePackage, setBoxCreatePackage] = useState(false)
  const btnCreatePackage = (
    <Button
      size="small"
      onClick={() => {
        setBoxCreatePackage(!boxCreatePackage)
      }}
    >
      + create package
    </Button>
  )
  const btnCreateSection = (
    <Button size="small" tag={Link} to="/app/qbank/create-section">
      + create section
    </Button>
  )
  const btnCreateQuestion = (
    <Button size="small" tag={Link} to="/app/qbank/create-question">
      + create question
    </Button>
  )
  const [pageTable2, setPageTable2] = useState(1)

  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

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
          <div>Questions Bank</div>
          <div className="float-right">
            {link === 'packages'
              ? btnCreatePackage
              : link === 'sections'
              ? btnCreateSection
              : btnCreateQuestion}
          </div>
        </div>
      </PageTitle>
      <hr />
      <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          className="cursor-pointer"
          onClick={() => {
            setLink('packages')
          }}
        >
          <InfoCard title="Packages" value="10">
            <RoundIcon
              icon={CardsIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setLink('sections')
          }}
        >
          <InfoCard title="Sections" value="500">
            <RoundIcon
              icon={ModalsIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setLink('questions')
          }}
        >
          <InfoCard title="Question" value="1000">
            <RoundIcon
              icon={MenuIcon}
              iconColorClass="text-red-500 dark:text-red-100"
              bgColorClass="bg-red-100 dark:bg-red-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
      </div>
      <div className="my-4">{boxCreatePackage ? <CreatePackages /> : ''}</div>
      <SectionTitle>
        {link === 'packages'
          ? 'Package list'
          : link === 'sections'
          ? 'Section list'
          : 'Question list'}
      </SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Display name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell></TableCell>
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

export default Qbank
