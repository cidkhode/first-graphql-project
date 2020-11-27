import React from 'React';
import ReactTable from 'react-table-6';
import PropTypes from 'prop-types';

import 'react-table-6/react-table.css'
import '../styles/Components/Table.less';

export const Table = ({ columns, data, extraClass }) => {
  return (
    <div className={`table-component-container ${extraClass}`}>
      <ReactTable data={data} columns={columns} minRows = {0} />
    </div>
  )
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  extraClass: PropTypes.string // not using currently but if in the future I want to I can
};

Table.defaultProps = {
  extraClass: ''
};

export default Table;