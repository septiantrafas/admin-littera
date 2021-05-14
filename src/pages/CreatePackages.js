import React, { useEffect } from 'react'
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
import { useForm } from 'react-hook-form'
import {
  clearCreatePackageStatus,
  createNewPackage,
  fetchPackage,
} from '../app/packagesSlice'
import { unwrapResult } from '@reduxjs/toolkit'
function CreatePackages() {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const organizations = useSelector(
    (state) => state.organizations.organizationList,
  )
  const organizationStatus = useSelector(
    (state) => state.organizations.organizationListStatus,
  )
  const packageStatus = useSelector((state) => state.packages.packageStatus)

  const createPackageStatus = useSelector(
    (state) => state.packages.createPackageStatus,
  )

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

  const canSave = createPackageStatus === 'idle'

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewPackage(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearCreatePackageStatus())
      }
  }

  return (
    <>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label className="mt-1">
            <span>Organization</span>
            <Select
              className="mt-1"
              defaultValue=""
              {...register('organizations_id')}
            >
              <option disabled>select option</option>
              {organizations.map((data) => {
                return <option value={data.id}>{data.name}</option>
              })}
            </Select>
          </Label>
          <Label>
            <span>Name</span>
            <Input className="mt-1" defaultValue="" {...register('name')} />
          </Label>
          <div className="flex justify-end my-4">
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

export default CreatePackages
