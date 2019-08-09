import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader component', () => {
    it('is being rendered correctly', () => {
        shallow(<Loader />);
    });
});