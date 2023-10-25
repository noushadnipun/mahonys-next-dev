import InsuranceForm from "@/components/insurence/InsuranceForm";
import InsuranceTable from "@/components/insurence/InsuranceTable";
import PageTittle from "@/components/common/PageTittle";

const InsuranceSettings = () => {
    return (
        <section className="row">
            <PageTittle tittle={"Insurance"} />
            <form action="">
                <InsuranceTable
                    props={{ tittle: "Heavy Motor Insurance:" }}
                    data={[
                        { src: "", lisence: "3245432", date: "21/12/2023" },
                        { src: "", lisence: "3245432", date: "21/12/2023" },
                    ]}
                />
                <InsuranceTable
                    props={{ tittle: "Marine Insurance" }}
                    data={[{ src: "", lisence: "3245432", date: "21/12/2023" }]}
                />
                <InsuranceTable
                    props={{ tittle: "NHVR Certificate" }}
                    data={[{ src: "", lisence: "3245432", date: "21/12/2023" }]}
                />
                <InsuranceTable
                    props={{ tittle: "Workcover Insurance" }}
                    data={[{ src: "", lisence: "3245432", date: "21/12/2023" }]}
                />
                <InsuranceTable
                    props={{ tittle: "Mass Management Details" }}
                    data={[{ src: "", lisence: "3245432", date: "21/12/2023" }]}
                />
                <InsuranceTable
                    props={{ tittle: "TMA" }}
                    data={[{ src: "", lisence: "3245432", date: "21/12/2023" }]}
                />
            </form>
        </section>

    );
};

export default InsuranceSettings;
