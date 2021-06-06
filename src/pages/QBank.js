import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
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
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuestion, fetchQuestion } from '../app/questionsSlice'
import { deletePackage, fetchPackage } from '../app/packagesSlice'
import { deleteSection, fetchSection } from '../app/sectionsSlice'

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
  const [pageTable2, setPageTable] = useState(1)

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

  function onPageChangeTable2(p) {
    setPageTable(p)
  }

  useEffect(() => {
    setDataTable(
      response.slice(
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
      {link === 'packages' ? (
        <PackageListTable />
      ) : link === 'sections' ? (
        <SectionListTable />
      ) : link === 'questions' ? (
        <QuestionListTable />
      ) : (
        ''
      )}
    </>
  )
}

export default Qbank

function PackageListTable() {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.packages.packageList)
  const packageListStatus = useSelector(
    (state) => state.packages.packageListStatus,
  )

  useEffect(() => {
    if (packageListStatus === 'idle') {
      dispatch(fetchPackage())
    }
  }, [packageListStatus, dispatch])
  const [pageTable, setPageTable] = useState(1)

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

  function removePackage(id) {
    dispatch(deletePackage(id))
  }

  function onPageChangeTable2(p) {
    setPageTable(p)
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
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>name</TableCell>
            <TableCell>action</TableCell>
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
                      {data.id}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={() => removePackage(data.id)}
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
  )
}

function SectionListTable() {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.sections.sectionList)
  const sectionListStatus = useSelector(
    (state) => state.sections.sectionListStatus,
  )

  useEffect(() => {
    if (sectionListStatus === 'idle') {
      dispatch(fetchSection())
    }
  }, [sectionListStatus, dispatch])
  const [pageTable, setPageTable] = useState(1)

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

  function onPageChangeTable2(p) {
    setPageTable(p)
  }

  function removeSection(id) {
    dispatch(deleteSection(id))
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
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Title</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Context</TableCell>
            <TableCell>Start time</TableCell>
            <TableCell>End time</TableCell>
            <TableCell>Action</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {dataTable.map((data, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">{data.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {data.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{data.number}</span>
              </TableCell>
              <TableCell>
                {/* <span className="text-sm">{data.context}</span> */}
              </TableCell>
              <TableCell>
                <span className="text-sm">{data.start_time}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{data.end_time}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={() => removeSection(data.id)}
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
  )
}

function QuestionListTable() {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.questions.questionList)
  const questionListStatus = useSelector(
    (state) => state.questions.questionListStatus,
  )

  useEffect(() => {
    if (questionListStatus === 'idle') {
      dispatch(fetchQuestion())
    }
  }, [questionListStatus, dispatch])
  const [pageTable, setPageTable] = useState(1)

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 1
  const totalResults = response.length

  function onPageChangeTable2(p) {
    setPageTable(p)
  }

  function removeQuestion(id) {
    dispatch(deleteQuestion(id))
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
    <TableContainer>
      <Table className="w-full">
        <TableHeader>
          <tr>
            <TableCell>Question</TableCell>
            <TableCell>options</TableCell>
            <TableCell>keys</TableCell>
            <TableCell>Action</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {dataTable.map((data, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">
                      {ReactHtmlParser(data.question)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      sections id : {data.sections_id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {JSON.parse(data.options).map((data) =>
                    ReactHtmlParser(data.value),
                  )}
                </span>
              </TableCell>
              <TableCell>
                <Badge>{data.keys}</Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit">
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={() => removeQuestion(data.id)}
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
  )
}
