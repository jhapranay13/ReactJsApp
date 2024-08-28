import { Accordian } from "../accordian/Accordian"
import { UserTable } from "../userTable/UserTable";


export const Administration = () => {

    return (
        <Accordian header={"User Account Management"}>
            <UserTable></UserTable>
        </Accordian>
    );
};