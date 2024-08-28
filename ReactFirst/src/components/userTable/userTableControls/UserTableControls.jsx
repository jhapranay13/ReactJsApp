import classes from './UserTableControls.module.css';

export const UserTableControls = ({onRecordsPerPageChangeHandler, onPageChangeHandler, recordsPerPage, pagesToDraw}) => {
    const pageOption = [];
    
    for (let i = 1; i <= pagesToDraw; i++) {
        pageOption.push(
            <option value={i} key={`page_number${i}`}>{i}</option>
        );
    }

    return (
        <div className={classes["user-table-controls"]}>
            <div className={classes["recods-per-page-container>"]}> 
                <label >Number of records per page:</label>
                <select className={classes["records-per-page"]} name="record-per-page" onChange={onRecordsPerPageChangeHandler}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>    
            <div className={classes["page-num-lbl-container"]}>
                <label className={classes["page-number-lbl"]}>Jump to Page:</label>
                <div className={classes["page-number-container"]}>
                    <select className={classes["page-number"]} onChange={onPageChangeHandler}>
                        {pageOption}
                    </select>
                </div>
            </div>
        </div>
    );
};  