import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

function CreateOrganizations() {
  return (
    <>
      <PageTitle>New Organization</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Address</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>PIC Name</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Phone</span>
          <Input className="mt-1" />
        </Label>
        <Label>
          <span>Email</span>
          <Input className="mt-1" />
        </Label>
      </div>
    </>
  )
}

export default CreateOrganizations
