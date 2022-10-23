import { PropTypes } from 'prop-types';

export default function Filter({ filter, handleChange }) {

    
    return (
        <input type="text" name="filter" value={filter} onChange={handleChange}></input>
    )
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};