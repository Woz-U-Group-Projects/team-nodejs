import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <button onClick={toggleTheme} >
      <FiSun />
      <FiMoon />
    </button>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;