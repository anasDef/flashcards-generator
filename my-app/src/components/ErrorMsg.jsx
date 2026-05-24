import "./Error.css"
import { IoCloseCircle } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";


export default function ErrorMsg({ title, description }) {
    return (
        <div className={`wrapper ${title && description ? 'active' : ''}`}>
            <article className="error-msg" role="alert" aria-live="polite">
                {/* <button className="error-msg__icon-wrapper" aria-label="close button" type="button">
                    <IoCloseCircle className="error-msg__icon" />
                </button> */}

                <div className="error-msg__info">
                    <h3 className="error-msg__title">{title}</h3>
                    <p className="error-msg__descritp">
                        {description}
                    </p>
                </div>

                <div className="error-msg__wraning">
                    <IoIosWarning className="error-msg__wraning-icon" />
                </div>
            </article>
        </div>
    )
}