
const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const hasNumber = /\d/;  

export const ValidationMessage = ({errorElements}) => {

    return (
        <div className="error-container">
            {errorElements}
        </div>
    );
};