import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ primary, text, backgroundColor, ...props }) => {
  return (
    <button
      type="button"
      className={primary ? 'button' : ['button', 'button--secondary'].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: true,
  onClick: undefined,
};

export default Button;