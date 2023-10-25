import PageTittle from "@/components/common/PageTittle";
import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";

const SubcontractorsInvoice = () => {
  return (
    <AuthLayout
      props={[
        { li: "All", href: "/smith/subcontractors/invoice" },
        { li: "Subcontractors", href: "/smith/subcontractors" },
      ]}
    >
      <section>
        <PageTittle titlte={"Invoice"} />
        <div ClassName="container">
          <div ClassName="row">
            <div ClassName="col-lg-12">
              <div ClassName="card">
                <div ClassName="card-body">
                  <div ClassName="invoice-title">
                    <h4 ClassName="float-end font-size-15">
                      Invoice #DS0204{" "}
                      <span ClassName="badge bg-success font-size-12 ms-2">
                        Paid
                      </span>
                    </h4>
                    <div ClassName="mb-4">
                      <h2 ClassName="mb-1 text-muted">Bootdey.com</h2>
                    </div>
                    <div ClassName="text-muted">
                      <p ClassName="mb-1">
                        3184 Spruce Drive Pittsburgh, PA 15201
                      </p>
                      <p ClassName="mb-1">
                        <i ClassName="uil uil-envelope-alt me-1"></i>{" "}
                        xyz@987.com
                      </p>
                      <p>
                        <i ClassName="uil uil-phone me-1"></i> 012-345-6789
                      </p>
                    </div>
                  </div>
                  <hr ClassName="my-4" />

                  <div ClassName="row">
                    <div ClassName="col-sm-6">
                      <div ClassName="text-muted">
                        <h5 ClassName="font-size-16 mb-3">Billed To:</h5>
                        <h5 ClassName="font-size-15 mb-2">Preston Miller</h5>
                        <p ClassName="mb-1">
                          4068 Post Avenue Newfolden, MN 56738
                        </p>
                        <p ClassName="mb-1">PrestonMiller@armyspy.com</p>
                        <p>001-234-5678</p>
                      </div>
                    </div>
                    {/* end col   */}
                    <div ClassName="col-sm-6">
                      <div ClassName="text-muted text-sm-end">
                        <div>
                          <h5 ClassName="font-size-15 mb-1">Invoice No:</h5>
                          <p>#DZ0112</p>
                        </div>
                        <div ClassName="mt-4">
                          <h5 ClassName="font-size-15 mb-1">Invoice Date:</h5>
                          <p>12 Oct, 2020</p>
                        </div>
                        <div ClassName="mt-4">
                          <h5 ClassName="font-size-15 mb-1">Order No:</h5>
                          <p>#1123456</p>
                        </div>
                      </div>
                    </div>
                    {/* end col   */}
                  </div>
                  {/* end row   */}

                  <div ClassName="py-2">
                    <h5 ClassName="font-size-15">Order Summary</h5>

                    <div ClassName="table-responsive">
                      <table ClassName="table align-middle table-nowrap table-centered mb-0">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th ClassName="text-end">Total</th>
                          </tr>
                        </thead>
                        {/* end thead   */}
                        <tbody>
                          <tr>
                            <th scope="row">01</th>
                            <td>
                              <div>
                                <h5 ClassName="text-truncate font-size-14 mb-1">
                                  Black Strap A012
                                </h5>
                                <p ClassName="text-muted mb-0">Watch, Black</p>
                              </div>
                            </td>
                            <td>$ 245.50</td>
                            <td>1</td>
                            <td ClassName="text-end">$ 245.50</td>
                          </tr>
                          {/* end tr   */}
                          <tr>
                            <th scope="row">02</th>
                            <td>
                              <div>
                                <h5 ClassName="text-truncate font-size-14 mb-1">
                                  Stainless Steel S010
                                </h5>
                                <p ClassName="text-muted mb-0">Watch, Gold</p>
                              </div>
                            </td>
                            <td>$ 245.50</td>
                            <td>2</td>
                            <td ClassName="text-end">$491.00</td>
                          </tr>
                          {/* end tr   */}
                          <tr>
                            <th scope="row" colspan="4" ClassName="text-end">
                              Sub Total
                            </th>
                            <td ClassName="text-end">$732.50</td>
                          </tr>
                          {/* end tr   */}
                          <tr>
                            <th
                              scope="row"
                              colspan="4"
                              ClassName="border-0 text-end"
                            >
                              Discount :
                            </th>
                            <td ClassName="border-0 text-end">- $25.50</td>
                          </tr>
                          {/* end tr   */}
                          <tr>
                            <th
                              scope="row"
                              colspan="4"
                              ClassName="border-0 text-end"
                            >
                              Shipping Charge :
                            </th>
                            <td ClassName="border-0 text-end">$20.00</td>
                          </tr>
                          {/* end tr   */}
                          <tr>
                            <th
                              scope="row"
                              colspan="4"
                              ClassName="border-0 text-end"
                            >
                              Tax
                            </th>
                            <td ClassName="border-0 text-end">$12.00</td>
                          </tr>
                          {/* end tr   */}
                          <tr>
                            <th
                              scope="row"
                              colspan="4"
                              ClassName="border-0 text-end"
                            >
                              Total
                            </th>
                            <td ClassName="border-0 text-end">
                              <h4 ClassName="m-0 fw-semibold">$739.00</h4>
                            </td>
                          </tr>
                          {/* end tr   */}
                        </tbody>
                        {/* end tbody   */}
                      </table>
                      {/* end table   */}
                    </div>
                    {/* nd table responsive */}
                    <div ClassName="d-print-none mt-4">
                      <div ClassName="float-end">
                        <a
                          href="javascript:window.print()"
                          ClassName="btn btn-success me-1"
                        >
                          <i ClassName="fa fa-print"></i>
                        </a>
                        <a href="#" ClassName="btn btn-primary w-md">
                          Send
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default SubcontractorsInvoice;
