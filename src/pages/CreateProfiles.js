import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
  Button,
} from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  clearCreateProfileStatus,
  createNewProfile,
} from '../app/profilesSlice'

function CreateProfiles() {
  const dispatch = useDispatch()
  const createProfileStatus = useSelector(
    (state) => state.profiles.createProfileStatus,
  )
  const canSave = createProfileStatus === 'idle'

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewProfile(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearCreateProfileStatus())
      }
  }
  return (
    <>
      <PageTitle>New Profile</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Name</span>
            <Input className="mt-1" defaultValue="" {...register('name')} />
          </Label>
          <Label>
            <span>Email</span>
            <Input className="mt-1" defaultValue="" {...register('email')} />
          </Label>
          <Label>
            <span>Password</span>

            <Input
              className="mt-1"
              value={'password'}
              defaultValue="password"
              {...register('password')}
            />
          </Label>
          <Label className="mt-1">
            <span>Gender</span>
            <Select className="mt-1" defaultValue="" {...register('gender')}>
              <option disabled>select option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </Label>
          <Label>
            <span>Identity</span>
            <Input className="mt-1" defaultValue="" {...register('identity')} />
          </Label>
          <Label>
            <span>Birthday</span>
            <Input
              className="mt-1"
              defaultValue=""
              type="date"
              {...register('birth_date')}
            />
          </Label>
          <Label>
            <span>Address</span>
            <Input className="mt-1" defaultValue="" {...register('address')} />
          </Label>
          <Label>
            <span>Photo</span>
            <Input
              className="mt-1"
              defaultValue=""
              {...register('photo_url')}
            />
          </Label>
          <Label className="mt-1">
            <span>Role</span>
            <Select className="mt-1" defaultValue="" {...register('role')}>
              <option disabled>select option</option>
              <option value="participant">Participant</option>
              <option value="proctor">Proctor</option>
              <option value="employee">Employee</option>
            </Select>
          </Label>
          <div className="flex justify-between my-4">
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

export default CreateProfiles
