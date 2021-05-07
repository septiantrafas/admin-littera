import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

function CreateProfiles() {
  return (
    <>
      <PageTitle>New Organization</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" />
        </Label>
        <Label className="mt-1">
          <span>Gender</span>
          <Select className="mt-1">
            <option disabled>select option</option>
            <option>Female</option>
            <option>Male</option>
          </Select>
        </Label>
        <Label>
          <span>Identity</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Birthday</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Address</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>photo</span>
          <Input className="mt-1" />
        </Label>
      </div>
    </>
  )
}

export default CreateProfiles
