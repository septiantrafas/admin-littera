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
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, DropdownIcon } from '../icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// make a copy of the data, for the second table
import { fetchAnswer } from '../app/answersSlice'
import { fetchSchedule } from '../app/schedulesSlice'
import { fetchQuestion, fetchQuestionByPackageId } from '../app/questionsSlice'
import { fetchParticipant } from '../app/participantsSlice'
import XLSX from 'xlsx'
import { zeros } from 'mathjs'

function Report() {
  const dispatch = useDispatch()

  const answerList = useSelector((state) => state.answers.answerList)
  const participantList = useSelector(
    (state) => state.participants.participantList,
  )
  const questionList = useSelector((state) => state.questions.questionList)
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

  const reportByScheduleId = (
    schedule_id,
    answerList,
    questionList,
    participantList,
  ) => {
    const participant = participantList
    const question = questionList
    const answer = answerList
    console.log(participant)
    console.log(question)
    console.log(answer)
    let array = zeros([participant.length, question.length + 1])
    console.log(array)

    for (let index = 0; index < participant.length; index++) {
      array[index][0] = participant[index].profile_id.id
    }

    for (let i = 0; i < participant.length; i++) {
      for (let j = 1; j < question.length + 1; j++) {
        array[i][j] = question[j - 1].id
      }
    }

    function filterAnswer(array_key, participant_id, question_id) {
      if (
        participant_id === array_key.participant_id &&
        question_id === array_key.question_id
      ) {
        return array.answer.id
      }
    }

    for (let i = 0; i < participant.length; i++) {
      for (let j = 1; j < question.length + 1; j++) {
        array[i][j] = question[j - 1].number
      }
    }
    console.log(array)

    // let array = zeros([answer.length, 4])
    // for (let i = 0; i < 90; i++) {
    //   array[i][0] = answer[i].schedule_id
    //   array[i][1] = answer[i].profile_id
    //   array[i][2] = answer[i].question_id
    //   array[i][3] = answer[i].value
    // }
    // console.log(array)

    // for (let i = 0; i < participant.length; i++) {
    //   for (let j = 0; j < question.length; j++) {
    //     array[i][j + 1] = question[j].id
    //   }
    // }
    // for (let i = 0; i < participant.length; i++) {
    //   for (let j = 0; j < question.length; j++) {
    //     array[i][j + 1] = question[j].id
    //   }
    // }
    // for (let i = 0; i < participant.length; i++) {
    //   for (let j = 0; j < question.length; j++) {
    //     array[i][j + 1] = checkAnswer(answer, answer[i][0],array)
    //   }
    // }

    // console.log(array)
    // const data = answerList.filter((data) => data.schedule_id === id)
    // console.log(data)
    // const propertyValues = Object.values(data)
    // let results = [['no', 'no peserta', 'nama', 'kelamin', 'tanggal lahir', '']]
    // for (let index = 0; index < propertyValues.length; index++) {
    //   results = results.concat([Object.values(propertyValues[index])])
    // }
    // var wb = XLSX.utils.book_new()
    // wb.Props = {
    //   Title: 'SheetJS Tutorial',
    //   Subject: 'Test',
    //   Author: 'Littera',
    //   CreatedDate: new Date(),
    // }
    // wb.SheetNames.push('Test Sheet')
    // var ws_data = array
    // var ws = XLSX.utils.aoa_to_sheet(ws_data)
    // wb.Sheets['Test Sheet'] = ws
    // XLSX.writeFile(wb, 'sheetjs.xlsx')
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
                      onClick={() =>
                        reportByScheduleId(
                          data.id,
                          answerList,
                          questionList,
                          participantList,
                        )
                      }
                      size="icon"
                      aria-label="Edit"
                    >
                      <DropdownIcon className="w-5 h-5" aria-hidden="true" />
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
