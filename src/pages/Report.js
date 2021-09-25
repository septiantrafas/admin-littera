import React, { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
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
import { DownloadIcon } from '../icons'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAnswer } from '../app/answersSlice'
import { fetchSchedule } from '../app/schedulesSlice'
import { fetchQuestion } from '../app/questionsSlice'
import { fetchParticipant } from '../app/participantsSlice'
import XLSX from 'xlsx'
import { zeros } from 'mathjs'
import { supabase } from '../supabase'

function Report() {
  const dispatch = useDispatch()
  const response = useSelector((state) => state.schedules.scheduleList)
  const answerListStatus = useSelector(
    (state) => state.answers.answerListStatus,
  )

  useEffect(() => {
    if (answerListStatus === 'idle') {
      dispatch(fetchAnswer())
      dispatch(fetchSchedule())
      dispatch(fetchQuestion())
      dispatch(fetchParticipant())
    }
  }, [answerListStatus, dispatch])

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

  const reportByScheduleId = async (data) => {
    const questionByPackageId = await supabase
      .from('questions')
      .select('*')
      .eq('package_id', data.package_id)
    const participantByScheduleId = await supabase
      .from('participants')
      .select(`*,profiles:profile_id(name)`)
      .eq('schedule_id', data.id)
    const answersByScheduleId = await supabase
      .from('answers')
      .select('*')
      .eq('schedule_id', data.id)

    let array = zeros([
      participantByScheduleId.data.length,
      questionByPackageId.data.length + 1,
    ])

    for (let index = 0; index < participantByScheduleId.data.length; index++) {
      array[index][0] = participantByScheduleId.data[index].profiles.name
    }

    for (let i = 0; i < participantByScheduleId.data.length; i++) {
      for (let j = 1; j < questionByPackageId.data.length; j++) {
        array[i][j] = questionByPackageId.data[j - 1].id
      }
    }

    for (let i = 0; i < participantByScheduleId.data.length; i++) {
      for (let j = 1; j < questionByPackageId.data.length; j++) {
        array[i][j] = answersByScheduleId.data.find(
          (data) =>
            data.profile_id === participantByScheduleId.data[i].profile_id &&
            data.question_id === questionByPackageId.data[j - 1].id,
        ).value
      }
    }
    console.log(array)

    var wb = XLSX.utils.book_new()
    wb.Props = {
      Title: 'SheetJS Tutorial',
      Subject: 'Test',
      Author: 'Littera',
      CreatedDate: new Date(),
    }
    wb.SheetNames.push('Test Sheet')
    var ws_data = array
    var ws = XLSX.utils.aoa_to_sheet(ws_data)
    wb.Sheets['Test Sheet'] = ws
    XLSX.writeFile(wb, 'sheetjs.xlsx')
  }

  return (
    <>
      <PageTitle>
        <div className="flex justify-between">
          <div>Report</div>
        </div>
      </PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Schedule Name</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Exam date</TableCell>
              <TableCell>
                <div className="flex justify-center">Actions</div>
              </TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{data.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{data.organizations.name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(data.exam_date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => reportByScheduleId(data)}
                      size="icon"
                    >
                      <DownloadIcon className="w-5 h-5" />
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

export default Report
