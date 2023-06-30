import { PropTypes } from "prop-types";

function OpenBook({handleCloseDisplay}){
    return(
        <div className="display">
        <div className="open_book">
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="page turn"></span>
          <span className="cover"></span>
          <span className="page"></span>
          <span className="cover turn"></span>
        </div>
        <button id="close_display_btn" onClick={handleCloseDisplay}>
          Close
        </button>
      </div>
    )
}
OpenBook.propTypes = {
    handleCloseDisplay: PropTypes.func,
    };
export default OpenBook;