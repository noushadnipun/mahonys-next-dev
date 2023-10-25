import PageTittle from "@/components/common/PageTittle";
import CheckBox from "@/components/common/form/CheckBox";


const UserPermission = () => {
    return (

        <section className="row justify-content-between">
            <PageTittle titlte={"User Permission"} />
            <div className="col-lg">
                <div className="row  gap-5 align-content-between justify-content-between">
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Asset"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Commodity"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Contracts"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Customers"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Subcontactors"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Drivers"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Commodity Type"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"User Settings"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Company Settings"}
                        />
                    </div>
                    <div className="col-lg-2">
                        {" "}
                        <CheckBox
                            props={[
                                { label: "Add", id: "assets" },
                                { label: "Edit", id: "assets" },
                            ]}
                            title={"Organaizations Settings"}
                        />
                    </div>
                </div>
            </div>
        </section>

    );
};

export default UserPermission;
