import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Label, Select, Button, Input, Textarea } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
import { Link, useHistory, useParams } from 'react-router-dom'
import ntol from 'number-to-letter'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearQuestionUpdateStatus,
  fetchQuestionById,
  updateQuestion,
} from '../app/questionsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

function EditQuestions() {
  let history = useHistory()
  let { id } = useParams()
  const [packageId, setPackageId] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [number, setNumber] = useState(0)
  const [questionValue, setQuestionValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [fields, setFields] = useState([])
  const { register, handleSubmit, setValue } = useForm()
  const dispatch = useDispatch()
  const questionById = useSelector((state) => state.questions.questionById)
  const questionByIdStatus = useSelector(
    (state) => state.questions.questionByIdStatus,
  )
  const questionUpdateStatus = useSelector(
    (state) => state.questions.questionUpdateStatus,
  )
  useEffect(() => {
    if (questionByIdStatus === 'idle') {
      dispatch(fetchQuestionById(id))
    }
    setPackageId(questionById.package_id)
    setTextValue(questionById.text)
    setQuestionValue(questionById.question)
  }, [questionByIdStatus, dispatch])

  useEffect(() => {
    if (questionByIdStatus === 'succeeded') {
      setFields(JSON.parse(questionById.options))
    }
  }, [questionByIdStatus])

  useEffect(() => {
    setPackageId(questionById.package_id)
    setSectionId(questionById.section_id)
    setNumber(questionById.number)
  }, [packageId])

  const canSave = questionUpdateStatus === 'idle'

  function handleChange(i, editor) {
    const values = [...fields]
    values[i].value = editor
    setFields(values)
  }

  function handleAdd() {
    const values = [...fields]
    values.push({ value: null })
    setFields(values)
  }

  function handleRemove(i) {
    const values = [...fields]
    values.splice(i, 1)
    setFields(values)
  }

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.id = id
        data.question = questionValue
        data.text = textValue
        data.options = JSON.stringify(fields)
        const resultAction = await dispatch(updateQuestion(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearQuestionUpdateStatus())
      }
    console.log(data)
  }

  return (
    <>
      <PageTitle>Edit Question</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-3">
            <Label className="mt-1">
              <span>Package</span>
              <Select
                className="mt-1"
                onClick={(e) => setPackageId(e.target.value)}
                defaultValue=""
                {...register('packages_id')}
              >
                <option selected disabled>
                  select option
                </option>
                <option value={questionById.package_id}>
                  {questionById.package_id}
                </option>
              </Select>
            </Label>

            <Label className="mt-1">
              <span>Section </span>
              <Select
                className="mt-1"
                defaultValue=""
                onClick={(e) => setSectionId(e.target.value)}
                {...register('sections_id')}
              >
                <option selected disabled>
                  select option
                </option>
                <option value={questionById.section_id}>
                  {questionById.section_id}
                </option>
              </Select>
            </Label>
            <Label className="mt-1">
              <span>Number</span>
              <Input
                readOnly
                type="number"
                className="mt-1"
                defaultValue=""
                value={number}
                {...register('number')}
              />
            </Label>
          </div>
          <Label>
            <span>Text</span>
            <Editor
              apiKey="awlfaezu5y4xg5bp5dpcfy1vmmop4jjhw73t36hys3why589"
              value={textValue}
              onEditorChange={(editor) => {
                setTextValue(editor)
              }}
              init={{
                height: 500,
                menubar: false,
                external_plugins: {
                  tiny_mce_wiris:
                    'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
                },
                plugins:
                  'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                imagetools_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                toolbar:
                  'undo redo | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                skin: 'oxide-dark',

                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resize:vertical ; ',
              }}
            />
          </Label>
          <Label>
            <span>Question</span>
            <Editor
              apiKey="awlfaezu5y4xg5bp5dpcfy1vmmop4jjhw73t36hys3why589"
              onEditorChange={(editor) => {
                setQuestionValue(editor)
              }}
              value={questionValue}
              init={{
                height: 500,
                menubar: false,
                external_plugins: {
                  tiny_mce_wiris:
                    'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
                },
                plugins:
                  'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                imagetools_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                toolbar:
                  'undo redo | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                skin: 'oxide-dark',

                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resize:vertical ; ',
              }}
            />
          </Label>
          <Label className="mt-1">
            {fields.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`}>
                  <div className="flex justify-between ">
                    <span className="mt-4">Option {ntol(idx)}</span>
                    {idx > 0 ? (
                      <Button
                        size="small"
                        type="button"
                        onClick={() => handleRemove(idx)}
                      >
                        x
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                  <Editor
                    apiKey="awlfaezu5y4xg5bp5dpcfy1vmmop4jjhw73t36hys3why589"
                    initialValue={field.value}
                    onEditorChange={(editor) => {
                      handleChange(idx, editor)
                    }}
                    init={{
                      height: 500,
                      menubar: false,
                      external_plugins: {
                        tiny_mce_wiris:
                          'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
                      },
                      plugins:
                        'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                      imagetools_cors_hosts: ['picsum.photos'],
                      menubar: 'file edit view insert format tools table help',
                      toolbar:
                        'undo redo | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                      toolbar_sticky: true,
                      skin: 'oxide-dark',

                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resize:vertical ; ',
                    }}
                  />
                </div>
              )
            })}
            <Button
              className="my-4"
              size="small"
              type="button"
              onClick={() => handleAdd()}
            >
              + option
            </Button>
          </Label>
          <Label className="mt-1">
            <span>Answer key</span>
            <Select className="mt-1" defaultValue="" {...register('keys')}>
              <option selected disabled>
                select option
              </option>
              {fields.map((field, idx) => {
                return <option value={ntol(idx)}>{ntol(idx)}</option>
              })}
            </Select>
          </Label>
          <div className="flex justify-between my-4">
            <div>
              <Button tag={Link} to="/app/qbank" size="small">
                Cancel
              </Button>
            </div>
            <div>
              <Button type="submit" size="small">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditQuestions
