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

  const reportByScheduleId = async (id, package_id) => {
  
  let answers = await supabase
  .from('answers')
  .select('*').eq('schedule_id',id)
  answers = answers.data

  let questions = await supabase
  .from('questions')
  .select(`*,sections(number)`)
  .eq('package_id',package_id)
  questions = questions.data
  questions = questions.sort(function(x,y){
    return x.number - y.number
  } ).sort(function(x,y){
    return x.sections.number - y.sections.number
  } )
  console.log(questions)

  let participants = await supabase
  .from('participants')
  .select(`id,profiles(name)`).eq('schedule_id',id)
  participants = participants.data

  let array = zeros(participants.length+1,questions.length+1)
  let array2 = zeros(participants.length+1,questions.length+1)
  array = array._data
  array2 = array2._data

  array[0][0] = 'participant/question'
  array2[0][0] = 'participant/question'

  for (let i = 0; i < questions.length; i++) {
    array[0][i+1] ="S"+String(questions[i].sections.number) +"Q"+ String(questions[i].number) 
    array2[0][i+1] ="S"+String(questions[i].sections.number) +"Q"+ String(questions[i].number) 
  }

  for (let i = 0; i < participants.length; i++) {
    for (let j = 0; j < questions.length; j++) {
      array[i+1][0] = participants[i].profiles.name
      array2[i+1][0] = participants[i].profiles.name
      array[i+1][j+1] = answers.find((data)=>data.participant_id === participants[i].id && data.question_id === questions[j].id).value
    }
  }

  for (let i = 0; i < participants.length; i++) {
    for (let j = 0; j < questions.length; j++) {
      switch (array[i+1][j+1]) {
        case "0":
          array2[i+1][j+1] = 'null'
          break;
        case "1":
          array2[i+1][j+1] = 'A'
          break;
        case "2":
          array2[i+1][j+1] = 'B'
          break;
        case "3":
          array2[i+1][j+1] = 'C'
          break;
        case "4":
          array2[i+1][j+1] = 'D'
          break;  
        case "5":
          array2[i+1][j+1] = 'E'
          break;
        default:
          break;
      }
    }
  }
  

    var wb = XLSX.utils.book_new()
    wb.Props = {
      Title: 'SheetJS Tutorial',
      Subject: 'Test',
      Author: 'Littera',
      CreatedDate: new Date(),
    }
    wb.SheetNames.push('Sheet A')
    wb.SheetNames.push('Sheet B')
    var ws_data = array
    var ws = XLSX.utils.aoa_to_sheet(ws_data)
    var ws_data2 = array2
    var ws2 = XLSX.utils.aoa_to_sheet(ws_data2)
    wb.Sheets['Sheet A'] = ws
    wb.Sheets['Sheet B'] = ws2
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
                      onClick={() => reportByScheduleId(data.id, data.package_id)}
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
