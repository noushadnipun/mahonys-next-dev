import PageTittle from "@/components/common/PageTittle";
import CheckBox from "@/components/common/form/CheckBox";

const OtherSettings = () => {
    return (
        <section>
            <PageTittle titlte={"Others Settings"} />
            <CheckBox
                props={[
                    {
                        label: "Accept & Get Notified for Subcontractor",
                        id: "all",
                        name: "notified",
                    },
                ]}
            />
            <CheckBox
                props={[
                    {
                        label: "Accept Without Notifications for Subcontractor",
                        id: "all",
                        name: "all",
                    },
                ]}
            />
        </section>
    );
};

export default OtherSettings;
