import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoaderBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8c8c8c85;
  z-index: 1;
`;

const Loader = () => {
  return (
    <LoaderBox>
      <Spinner animation="border" variant="success" />
    </LoaderBox>
  );
};

export default Loader;
