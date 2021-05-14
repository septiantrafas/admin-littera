import React, { useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Button } from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNewOrganization,
  clearCreateOrganizationStatus,
} from '../app/organizationsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
function CreateOrganizations() {
  const dispatch = useDispatch()
  const createOrganizationStatus = useSelector(
    (state) => state.organizations.createOrganizationStatus,
  )
  const canSave = createOrganizationStatus === 'idle'

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewOrganization(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearCreateOrganizationStatus())
      }
  }
  return (
    <>
      <PageTitle>New Organization</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Name</span>
              <Input className="mt-1" defaultValue="" {...register('name')} />
            </Label>
            <Label>
              <span>Address</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('address')}
              />
            </Label>
            <Label>
              <span>PIC Name</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('pic_name')}
              />
            </Label>
            <Label>
              <span>Phone</span>
              <Input className="mt-1" defaultValue="" {...register('phone')} />
            </Label>
            <Label>
              <span>Email</span>
              <Input className="mt-1" defaultValue="" {...register('email')} />
            </Label>
          </div>
          <div className="flex justify-between">
            <div>
              <Button tag={Link} to="/app/organizations" size="small">
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

export default CreateOrganizations
