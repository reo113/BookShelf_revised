import { PropTypes } from "prop-types";
function AddBook({showModal}){
    return (
        <>
        <div className="add_book">
            <input onClick={showModal} type='image' id='add_book_btn' alt="book_icon" src='../pile-of-books-vector-by-vexels.png'/>
        </div>
        </>
    );
}
AddBook.propTypes = {
    showModal: PropTypes.func,
};
export default AddBook;