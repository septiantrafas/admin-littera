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
import toast, { Toaster, useToaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
function CreateProctor() {
  const dispatch = useDispatch()

  const createOrganizationStatus = useSelector(
    (state) => state.organizations.createOrganizationStatus,
  )
  const canSave = createOrganizationStatus === 'idle'

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      pic_name: '',
      phone: '',
      email: '',
      total_participant: '',
    },
  })

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewOrganization(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearCreateOrganizationStatus())
      }
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        address: '',
        pic_name: '',
        phone: '',
        email: '',
        total_participant: '',
      })
    }
  }, [formState, reset])

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            marginTop: '90px',
            marginRight: '40px',
            background: '#363636',
            color: '#fff',
            zIndex: 1,
          },
          duration: 5000,
          success: {
            duration: 1000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 1000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <PageTitle>New Organization</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('name', { required: true })}
              />
              {errors.name?.type === 'required' && (
                <HelperText valid={false}>Name is required</HelperText>
              )}
            </Label>
            <Label>
              <span>Address</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('address', { required: true })}
              />
              {errors.address?.type === 'required' && (
                <HelperText valid={false}>Address is required</HelperText>
              )}
            </Label>
            <Label>
              <span>PIC Name</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('pic_name', { required: true })}
              />
              {errors.pic_name?.type === 'required' && (
                <HelperText valid={false}>PIC name is required</HelperText>
              )}
            </Label>
            <Label>
              <span>Phone</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('phone', { required: true })}
              />
              {errors.phone?.type === 'required' && (
                <HelperText valid={false}>Phone is required</HelperText>
              )}
            </Label>
            <Label>
              <span>Email</span>
              <Input
                className="mt-1"
                defaultValue=""
                {...register('email', { required: true })}
              />
              {errors.email?.type === 'required' && (
                <HelperText valid={false}>Email is required</HelperText>
              )}
            </Label>
            <Label>
              <span>Total participant</span>
              <Input
                className="mt-1"
                type="number"
                defaultValue=""
                {...register('total_participant', { required: true })}
              />
              {errors.total_participant?.type === 'required' && (
                <HelperText valid={false}>
                  Total Participant is required
                </HelperText>
              )}
            </Label>
          </div>
          <div className="flex justify-between">
            <div>
              <Button tag={Link} to="/app/organizations" size="small">
                Cancel
              </Button>
            </div>
            <div>
              {createOrganizationStatus === 'loading' ? (
                <>
                  <FulfillingBouncingCircleSpinner size="20" />
                </>
              ) : (
                <Button type="submit" size="small">
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateProctor
