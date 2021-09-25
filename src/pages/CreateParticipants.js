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
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSchedule } from '../app/schedulesSlice'
import { fetchProfile } from '../app/profilesSlice'
import {
  clearCreateParticipantStatus,
  createNewParticipant,
} from '../app/participantsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'

function CreateParticipants() {
  const dispatch = useDispatch()
  const schedules = useSelector((state) => state.schedules.scheduleList)
  const profiles = useSelector((state) => state.profiles.profileList)

  const scheduleStatus = useSelector(
    (state) => state.schedules.scheduleListStatus,
  )
  const profileStatus = useSelector((state) => state.profiles.profileListStatus)
  const createParticipantStatus = useSelector(
    (state) => state.participants.createParticipantStatus,
  )
  const canSave = createParticipantStatus === 'idle'

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (scheduleStatus === 'idle') {
      dispatch(fetchSchedule())
    }
  }, [scheduleStatus, dispatch])

  useEffect(() => {
    if (profileStatus === 'idle') {
      dispatch(fetchProfile())
    }
  }, [profileStatus, dispatch])

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.status = 'pretest'
        const resultAction = await dispatch(createNewParticipant(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(clearCreateParticipantStatus())
      }
  }
  return (
    <>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label className="mt-1">
              <span>Schedule</span>
              <Select
                className="mt-1"
                defaultValue=""
                {...register('schedule_id')}
              >
                <option disabled>select option</option>
                {schedules.map((data) => {
                  return <option value={data.id}>{data.name}</option>
                })}
              </Select>
            </Label>
            <Label className="mt-1">
              <span>Profiles</span>
              <Select
                className="mt-1"
                defaultValue=""
                {...register('profile_id')}
              >
                <option disabled>select option</option>
                {profiles.map((data) => {
                  return <option value={data.id}>{data.name} - {data.id}</option>
                })}
              </Select>
            </Label>
          </div>
          <div className="flex justify-end">
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

export default CreateParticipants
