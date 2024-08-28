import classes from './SearchSaveDelete.module.css';

import saveIcon from '../../../assets/save-icon.png';
import trashIcon from '../../../assets/trash.png';
import { memo, useContext, useRef, useState } from 'react';
import { deleteData, saveData } from '../../../data/Data';
import { ConfirmBox } from '../../confirmBox/ConfirmBox';
import { LoginContext } from '../../store/LoginContext';

const deleteMessage= "Are you Sure you want to delete the selected records??";
const saveMessage = "Are you Sure you want to Save the selected records??";

//checks if props changes for component function execution

export const SearchSaveDelete = memo(({onSearchHandler, checkBoxStatus:{checkBoxStatus, setCheckBoxStatus}, 
    currentChanges:{currentChanges, setCurrentChanges}, fetchData}) => {
    const loginData = useContext(LoginContext);

    const ref = useRef();
    const [execute, setExecute] = useState('');

    const setfnToExecuteOnOkTrash = async () => {
        deleteData(checkBoxStatus);
        setCheckBoxStatus(new Set());
        setCurrentChanges(new Map());
        await fetchData(loginData.userName);
        ref.current.close();
    };

    const setfnToExecuteOnOkSave = async () => {
        saveData(currentChanges);
        setCheckBoxStatus(new Set());
        setCurrentChanges(new Map());
        await fetchData(loginData.userName);
        ref.current.close();
    };

    const setfnToExecuteOnCancel = () => {
        ref.current.close();
    };

    const onTrashClickHandler = (event) => {
       setExecute("TRASH")
       ref.current.open();
    };

    const onSaveClickHandler = (event) => {
        setExecute("SAVE")
        ref.current.open();
    };
    let message = '';
    let fnToExecuteOnOk = () => {};

    if (execute === 'TRASH') {
        message = deleteMessage;
        fnToExecuteOnOk = setfnToExecuteOnOkTrash;
    }

    if (execute === 'SAVE') {
        message = saveMessage;
        fnToExecuteOnOk = setfnToExecuteOnOkSave;
    }
    return (
        <>
            <ConfirmBox ref={ref} message={message} fnToExecuteOnOk={fnToExecuteOnOk} fnToExecuteOnCancel={setfnToExecuteOnCancel}></ConfirmBox>
            <div className={classes["search-continaer"]}>
                <input className={classes["search-text"]} type="text" placeholder="Search User Name" onChange={onSearchHandler}/>  
                <div className={classes["user-table-operation"]}>              
                    <img className={classes["op-img"]} id="user-trash-img" src={trashIcon} onClick={onTrashClickHandler}/>
                    <img className={classes["op-img"]} id="user-save-img" src={saveIcon} onClick={onSaveClickHandler}/>
                </div>
            </div>
        </>
    );
});