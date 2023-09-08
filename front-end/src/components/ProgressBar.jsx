import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Require progress to be a number
};

export default ProgressBar;
