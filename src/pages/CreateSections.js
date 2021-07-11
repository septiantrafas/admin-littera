import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
  Button,
} from '@windmill/react-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchPackage } from '../app/packagesSlice'
import { Link } from 'react-router-dom'
import {
  clearCreateSectionStatus,
  createNewSection,
} from '../app/sectionsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Editor } from '@tinymce/tinymce-react'
function CreateSections() {
  const dispatch = useDispatch()
  const [textValue, setTextValue] = useState('')
  const packages = useSelector((state) => state.packages.packageList)
  const packageStatus = useSelector((state) => state.packages.packageListStatus)
  const createSectionStatus = useSelector(
    (state) => state.sections.createSectionStatus,
  )
  const canSave = createSectionStatus === 'idle'
  const { register, handleSubmit } = useForm()
  useEffect(() => {
    if (packageStatus === 'idle') {
      dispatch(fetchPackage())
    }
  }, [packageStatus, dispatch])
  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.context = textValue
        const resultAction = await dispatch(createNewSection(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearCreateSectionStatus())
      }
  }

  return (
    <>
      <PageTitle>New Section</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label className="mt-1">
            <span>Package</span>
            <Select className="mt-1" {...register('packages_id')}>
              <option disabled>select option</option>
              {packages.map((data) => {
                return <option value={data.id}>{data.name}</option>
              })}
            </Select>
          </Label>
          <Label>
            <span>Number</span>
            <Input type="number" className="mt-1" {...register('number')} />
          </Label>
          <Label>
            <span>Titles</span>
            <Input className="mt-1" {...register('title')} />
          </Label>
          <Label>
            <span>Context</span>
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
            <span>Start time</span>
            <Input
              type="datetime-local"
              className="mt-1"
              {...register('start_time')}
            />
          </Label>
          <Label>
            <span>End time</span>
            <Input
              type="datetime-local"
              className="mt-1"
              {...register('end_time')}
            />
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

export default CreateSections
