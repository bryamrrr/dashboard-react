import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import styles from './styles.css';

function getPager(total, current, size) {
  const totalItems = total;
  const currentPage = current || 1;
  const pageSize = size || 10;
  const totalPages = Math.ceil(totalItems / pageSize);

  let startPage;
  let endPage;

  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 6) {
    startPage = 1;
    endPage = 10;
  } else if (currentPage + 4 >= totalPages) {
    startPage = totalPages - 9;
    endPage = totalPages;
  } else {
    startPage = currentPage - 5;
    endPage = currentPage + 4;
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min((startIndex + pageSize) - 1, totalItems - 1);

  const pages = _.range(startPage, endPage + 1);

  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
}

class TablePagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pager: {},
    };

    this.setPage = this.setPage.bind(this);
  }

  componentWillMount() {
    this.setPage(this.props.initialPage, true);
  }

  setPage(page, firstTime) {
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) return;

    pager = getPager(this.props.count, page);

    this.setState({ pager });
    if (!firstTime) this.props.onChangePage(page);
  }

  render() {
    const pager = this.state.pager;

    const firstPageClass = (pager.currentPage === 1)
      ? `${styles.first} ${styles.disabled}`
      : styles.first;

    const prevPageClass = (pager.currentPage === 1)
      ? `${styles.prev} ${styles.disabled}`
      : styles.prev;

    const nextPageClass = (pager.currentPage === pager.totalPages)
    ? `${styles.next} ${styles.disabled}`
    : styles.next;

    const lastPageClass = (pager.currentPage === pager.totalPages)
    ? `${styles.last} ${styles.disabled}`
    : styles.last;

    return (
      <div className={styles.container}>
        <ul className={styles.pagination}>
          <li className={firstPageClass}>
            <a
              onClick={() => this.setPage(1)}
              aria-hidden
            >
              ...
            </a>
          </li>
          <li className={prevPageClass}>
            <a
              onClick={() => this.setPage(pager.currentPage - 1)}
              aria-hidden
            >
              <i className="linearicon-uni3c" />
            </a>
          </li>
          {pager.pages.map((page) => {
            const activePageClass = (pager.currentPage === page)
            ? styles.active
            : '';
            return (
              <li
                key={page}
                className={activePageClass}
              >
                <a
                  onClick={() => this.setPage(page)}
                  aria-hidden
                >
                  {page}
                </a>
              </li>
            );
          })}
          <li className={nextPageClass}>
            <a
              onClick={() => this.setPage(pager.currentPage + 1)}
              aria-hidden
            >
              <i className="linearicon-uni3e" />
            </a>
          </li>
          <li className={lastPageClass}>
            <a
              onClick={() => this.setPage(pager.totalPages)}
              aria-hidden
            >
              ...
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

TablePagination.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default TablePagination;
