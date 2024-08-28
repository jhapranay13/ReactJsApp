import classes from './UserTable.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../store/LoginContext';
import { fetchUserData } from '../../data/Data';
import { SearchSaveDelete } from './userTableAction/SearchSaveDelete';
import { UserTableControls } from './userTableControls/UserTableControls';
import { UserTableComponent } from './userTableComponent/UserTableComponent';

const filterResult = (searchVal, userInfos) => {
    const copyUser = userInfos.filter((userInfo, i, arr) => {

        if (!userInfo.userName.includes(searchVal)) {

            return false;
        }
        return true;
    });
    return copyUser;
};

export const UserTable = () => {
    const loginData = useContext(LoginContext);
    const [fetchedData, setFetchedData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableDataCpy, setTableDataCpy] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [pagesToDraw, setPagesToDraw] = useState(0);
    const [checkBoxStatus, setCheckBoxStatus] = useState(new Set());
    const [currentChanges, setCurrentChanges] = useState(new Map());

    const fetchData = async (userName) => {

        if (userName) {
            const fetchTblData = await fetchUserData(loginData.userName);
            setTableData(fetchTblData);
            setFetchedData(fetchTblData);
            setTableDataCpy((prevState) => {
                const newState = [];

                for (let i = 0; i < recordsPerPage; i++) {
                    newState.push(fetchTblData[i]);
                }
                return newState;
            });
            setPagesToDraw( ()=> {
                let pagesToDraw = fetchTblData.length / recordsPerPage + 
                    (fetchTblData.length % recordsPerPage != 0 ? 1 : 0);
                return pagesToDraw;
            });
        }
    };

    useEffect(() => {
       fetchData(loginData.userName);
    }, []);

    const onCheckboxChangeHandler = (event) => {
        const userName = event.target.dataset.userId;
        const index = event.target.dataset.index;

        if (event.target.checked) {
            setCheckBoxStatus((prevState) => {
                const newState = new Set(prevState);
                newState.add(userName);
                return newState;
            });
            setCurrentChanges((prevState) => {
                const newState = new Map(prevState);
                newState.set(userName, tableData[index]);
                return newState;
            });
        } else {
            setCheckBoxStatus((prevState) => {
                const newState = new Set(prevState);
                newState.delete(userName);
                return newState;
            });
            setCurrentChanges((prevState) => {
                const newState = new Map(prevState);
                newState.delete(userName);
                return newState;
            });
        }
    };

    const onRecordsPerPageChangeHandler = (event) => {
        const value = event.target.value;
        setRecordsPerPage((prevVal) => value);

        setTableDataCpy((prevState) => {
            const newState = [];
            const limit = Math.min(value, tableData.length);

            for (let i = 0; i < limit; i++) {
                newState.push(tableData[i]);
            }
            return newState;
        });
        setPagesToDraw(() => {
            let pagesToDraw = tableData.length / value + 
                (tableData.length % value != 0 ? 1 : 0);
            return pagesToDraw;
        });
    };
   
    const onPageChangeHandler = (event) => {
        const pageValue = event.target.value;
        const endIndex = Math.min(recordsPerPage * pageValue, tableData.length);

        setTableDataCpy((prevState) => {
            const newState = [];
            const pageValue = event.target.value;
            const endIndex = Math.min(recordsPerPage * pageValue, tableData.length);
            let startIndex = (pageValue - 1) * recordsPerPage;

            for (let i = startIndex; i < endIndex; i++) {
                newState.push(tableData[i]);
            }
            return newState;
        });
    };

    const onSearchHandler = useCallback((event) => {
        let value = event.target.value;
        
        const filteredData = value.trim() === '' ? [...fetchedData] : filterResult(value, fetchedData);
        setTableData(() => filteredData);
        setTableDataCpy(() => {
            const limit = Math.min(recordsPerPage, filteredData.length);
            const newState = [];

            for (let i = 0; i < limit; i++) {
                newState.push(filteredData[i]);
            }
            return newState;
        });
        setPagesToDraw(() => {
            let pagesToDraw = filteredData.length / recordsPerPage + 
                (filteredData.length % recordsPerPage != 0 ? 1 : 0);
            return pagesToDraw;
        });
    },[tableData, tableDataCpy, pagesToDraw]);
    return (
        <>
        {fetchedData.length > 0 ?
        <div className={classes["user_table-search-container"]}>
            <SearchSaveDelete onSearchHandler={onSearchHandler} checkBoxStatus={{checkBoxStatus, setCheckBoxStatus}} currentChanges={{currentChanges, setCurrentChanges}} fetchData={fetchData}/>
            <UserTableComponent tableData={tableDataCpy} checkBoxStatus={{checkBoxStatus, setCheckBoxStatus}} currentChanges={{currentChanges, setCurrentChanges}} onCheckboxChangeHandler={onCheckboxChangeHandler}/>
            <UserTableControls onRecordsPerPageChangeHandler={onRecordsPerPageChangeHandler} onPageChangeHandler={onPageChangeHandler} recordsPerPage={recordsPerPage} pagesToDraw={pagesToDraw}/>
        </div> 
        :
        <p>Loading Data....</p>
        }
        </>
    );
};