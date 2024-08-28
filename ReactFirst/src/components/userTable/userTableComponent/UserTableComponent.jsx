import classes from './UserTableComponent.module.css';

export const UserTableComponent = ({tableData, checkBoxStatus : {checkBoxStatus, setCheckBoxStatus}, 
    currentChanges: {currentChanges, setCurrentChanges}, onCheckboxChangeHandler}) => {
    const tableRows = [];
   

    const onChangeHandler = (event) => {
        let user = event.target.dataset.userId;
        const obj = currentChanges.get(user);
        setCurrentChanges((prevState) => {
            const newState = new Map(prevState);
            const obj = prevState.get(user);
            newState.set(user, {
                ...obj,
                password: event.target.value
            });
            return newState;
        });
    }

    const onChangeHandlerDrpDwn = (event) => {
        let user = event.target.dataset.userId;
        const obj = currentChanges.get(user);
        setCurrentChanges((prevState) => {
            const newState = new Map(prevState);
            const obj = prevState.get(user);
            newState.set(user, {
                ...obj,
                roles: event.target.value
            });
            return newState;
        });
    }

    if (tableData.length > 0) {
        let counter = 0;

        for (let userIn of tableData) {
            let userInfo = userIn

            if (currentChanges.has(userInfo.userName)) {
                userInfo = currentChanges.get(userInfo.userName);

            }
            let selectedVal = "";
            selectedVal = userInfo.roles === "premium" ? "premium": selectedVal;
            selectedVal = userInfo.roles === "normal" ? "normal" : selectedVal;
            selectedVal = userInfo.roles === "admin" ? "admin": selectedVal;

            let color = counter % 2 == 0 ? "green" : "white"
            tableRows.push(
                <tr key={`row_${counter}`} data-user-id={userInfo.userName}>
                    <td>
                        <input className={classes[`password-input-text-${color}`]} disabled type="text" value={userInfo.userName} data-user-id={userInfo.userName}/>
                    </td>
                    <td>
                        <input className={classes[`password-input-text-${color}`]} disabled={!checkBoxStatus.has(userInfo.userName)} type="text" value={userInfo.password} data-user-id={userInfo.userName} onChange={onChangeHandler}/>
                    </td>
                    <td>
                        {  !checkBoxStatus.has(userInfo.userName) ?
                            <input className={!checkBoxStatus.has(userInfo.userName)? classes[`password-input-text-${color}`] : classes['hidden']} disabled type="text" value={userInfo.roles} data-user-id={userInfo.userName}/> 
                            : null
                        }
                        { checkBoxStatus.has(userInfo.userName) ?
                            <select className={classes[`password-input-text-${color}`]}  data-user-id={userInfo.userName} defaultValue={selectedVal} onChange={onChangeHandlerDrpDwn}>
                                <option value="admin" data-index="${counter}" >admin</option>
                                <option value="premium" data-index="${counter}" >premium</option>
                                <option value="normal" data-index="${counter}" >normal</option>
                            </select> : null

                        }
                    </td>
                    <td>
                        <input type="checkbox" checked={checkBoxStatus.has(userInfo.userName)} className={classes["edit-chk"]} data-user-id={`${userInfo.userName}`} data-index={counter} onChange={onCheckboxChangeHandler}/>
                    </td> 
                </tr>
            );
            counter++;
        }
    }

    return (
        <div className={classes["user-table-container"]}>
            <table className={classes["user-table"]}>
                <tbody>
                    <tr>
                        <th>
                            User Name
                        </th>
                        <th>
                            Password
                        </th>
                        <th>
                            Roles
                        </th>
                        <th>
                            Edit/Select
                        </th>
                    </tr>
                </tbody>    
                <tbody className={classes["user-record-container"]}>
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
};