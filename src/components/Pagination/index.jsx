import React from "react";
import styles from "./pagination.module.scss";
import ReactPaginate from "react-paginate";




const Pagination = ({onChangePage, activePage}) => {
  
    return (
        <div className={styles.root}>
        <ReactPaginate
        className={styles.paginationItem}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        forcePage={activePage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
    )
}

export default Pagination;