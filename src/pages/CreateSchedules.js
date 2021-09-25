import React, { useEffect } from 'react'
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
import { fetchOrganization } from '../app/organizationsSlice'
import { fetchPackage } from '../app/packagesSlice'
import { Link } from 'react-router-dom'
import {
  clearCreateScheduleStatus,
  createNewSchedule,
} from '../app/schedulesSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'

function CreateSchedules() {
  const dispatch = useDispatch()
  const packages = useSelector((state) => state.packages.packageList)
  const organizations = useSelector(
    (state) => state.organizations.organizationList,
  )
  const packageStatus = useSelector((state) => state.packages.packageListStatus)
  const organizationStatus = useSelector(
    (state) => state.organizations.organizationListStatus,
  )
  const createScheduleStatus = useSelector(
    (state) => state.schedules.createScheduleStatus,
  )
  const canSave = createScheduleStatus === 'idle'

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (organizationStatus === 'idle') {
      dispatch(fetchOrganization())
    }
  }, [organizationStatus, dispatch])

  useEffect(() => {
    if (packageStatus === 'idle') {
      dispatch(fetchPackage())
    }
  }, [packageStatus, dispatch])

  const onSubmit = async (data) => {
    if (canSave)
      try {
        console.log(data)
        const resultAction = await dispatch(createNewSchedule(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearCreateScheduleStatus())
      }
  }

  return (
    <>
      <PageTitle>New Schedules</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label className="mt-1">
            <span>Package</span>
            <Select
              className="mt-1"
              defaultValue=""
              {...register('package_id')}
            >
              <option disabled>select option</option>
              {packages.map((data) => {
                return <option value={data.id}>{data.name}</option>
              })}
            </Select>
          </Label>
          <Label className="mt-1">
            <span>Organization</span>
            <Select
              className="mt-1"
              defaultValue=""
              {...register('organization_id')}
            >
              <option disabled>select option</option>
              {organizations.map((data) => {
                return <option value={data.id}>{data.name} - {data.id}</option>
              })}
            </Select>
          </Label>
          <Label>
            <span>Name</span>
            <Input className="mt-1" defaultValue="" {...register('name')} />
          </Label>
          <Label>
            <span>Exam date</span>
            <Input
              type="datetime-local"
              className="mt-1"
              defaultValue=""
              {...register('exam_date')}
            />
          </Label>
          <Label>
            <span>Zoom url</span>
            <Input className="mt-1" defaultValue="" {...register('url')} />
          </Label>
          <div className="flex justify-between my-4">
            <div>
              <Button tag={Link} to="/app/exam" size="small">
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

export default CreateSchedules
