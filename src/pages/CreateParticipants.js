import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

function CreateParticipants() {
  return (
    <>
      <PageTitle>New Participants</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label className="mt-1">
          <span>Schedule</span>
          <Select className="mt-1">
            <option disabled>select option</option>
            <option>A</option>
            <option>B</option>
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Profiles</span>
          <Select className="mt-1">
            <option disabled>select option</option>
            <option>A</option>
            <option>B</option>
          </Select>
        </Label>
      </div>
    </>
  )
}

export default CreateParticipants
