import React from 'react'
import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

function CreateSections() {
  return (
    <>
      <PageTitle>New Section</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label className="mt-1">
          <span>Section</span>
          <Select className="mt-1">
            <option disabled>select option</option>
            <option>A</option>
            <option>B</option>
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Package</span>
          <Select className="mt-1">
            <option disabled>select option</option>
            <option>A</option>
            <option>B</option>
          </Select>
        </Label>
        <Label>
          <span>Number</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Titles</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Context</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Start time</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>End time</span>
          <Input className="mt-1" />
        </Label>
      </div>
    </>
  )
}

export default CreateSections
