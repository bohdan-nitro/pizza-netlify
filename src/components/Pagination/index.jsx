import React from "react";
import styles from "./pagination.module.scss";
import ReactPaginate from "react-paginate";




const Pagination = () => {
    return (
        <div className={styles.root}>
        <ReactPaginate
        className={styles.paginationItem}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => console.log(event)}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
    )
}

export default Pagination;