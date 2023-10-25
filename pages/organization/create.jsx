"use client";
import axios from "@/helpers/axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import {toast, Toaster} from "react-hot-toast";

const OrganizationCreate = () => {
  const router = useRouter();

  const setupOrg = async (e) => {
    e.preventDefault();
    const payload = {
      org_name: e.target.name.value,
      org_abn: e.target.abn.value,
      org_email: e.target.email.value,
      org_phone: e.target.phone.value,
      org_address: {
        address: e.target.address.value,
        suburb: e.target.suburb.value,
        city: e.target.cityTown.value,
        state: e.target.state.value,
        country: e.target.country.value,
        postCode: e.target.postcode.value,
      },
    };

    try {
      const res = await axios.post("organization/create", payload);
      if (res.data.status) {
        //console.log(res.data.status)
        router.push("/organization/company_setting");
      }else {
        if(res.data.message.length > 0){
          res.data.message.map(item => {
            toast.error(item)
          })
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="row m-0">
      <Toaster />
      <div className="col-lg-11">
        <div className="row">
          <div className="col-md-5">
            <div className="login-container organization mx-3 mt-4">
              <form onSubmit={setupOrg} className="shadow p-4 rounded-3">
                <h2 className="text-primary py-3">Setup Organaization</h2>
                <div className="row ">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="abn"
                        placeholder="Business Number"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Default Email"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="phone"
                        className="form-control"
                        name="phone"
                        placeholder="Default Phone"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Street Address"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="suburb"
                        placeholder="Suburb"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="cityTown"
                        placeholder="City/Town"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Country"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="postcode"
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group text-end  ">
                  <button type="submit" className="btn btn-primary submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCreate;
