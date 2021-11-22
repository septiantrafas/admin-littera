import React, { useEffect, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";
import toast, { Toaster } from "react-hot-toast";
import SectionTitle from "../components/Typography/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateOrganizationStatus,
  clearOrganizationDeleteStatus,
  deleteOrganization,
  fetchOrganization,
} from "../app/organizationsSlice";

function Organizations() {
  const dispatch = useDispatch();

  const buttonOrg = (
    <Button size="small" tag={Link} to="/app/organizations/create-organization">
      + new organization
    </Button>
  );

  const response = useSelector((state) => state.organizations.organizationList);
  const organizationListStatus = useSelector(
    (state) => state.organizations.organizationListStatus
  );
  const organizationDeleteStatus = useSelector(
    (state) => state.organizations.organizationDeleteStatus
  );
  const createOrganizationStatus = useSelector(
    (state) => state.organizations.createOrganizationStatus
  );

  useEffect(() => {
    if (createOrganizationStatus === "succeeded") {
      toast.success("Berhasil menambahkan data!");
      dispatch(clearCreateOrganizationStatus());
    }
  }, [createOrganizationStatus, dispatch]);

  useEffect(() => {
    if (organizationListStatus === "idle") {
      dispatch(fetchOrganization());
    }
  }, [organizationListStatus, dispatch]);

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  const resultsPerPage = 7;
  const totalResults = response.length;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  function removeOrganization(id) {
    dispatch(deleteOrganization(id));
    if (organizationDeleteStatus === "succeeded") {
      toast.success("deleted!");
    }
    dispatch(clearOrganizationDeleteStatus());
  }

  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [response, pageTable]);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            marginTop: "90px",
            marginRight: "40px",
            background: "#363636",
            color: "#fff",
            zIndex: 1,
          },
          duration: 5000,
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <PageTitle>
        <div className="flex justify-between">
          <div>Organizations</div>
          <div className="float-right">{buttonOrg}</div>
        </div>
      </PageTitle>
      <hr className="mb-4" />
      <SectionTitle>Company list</SectionTitle>
      <TableContainer className="mb-8 ">
        <Table className="min-w-full">
          <TableHeader>
            <tr>
              <TableCell>Company name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total participant</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{data.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {data.pic_name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.phone}</span>
                </TableCell>
                <TableCell className=" w-1/4">
                  <span className="text-sm truncate ">{data.address}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.total_participant}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => removeOrganization(data.id)}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Organizations;
