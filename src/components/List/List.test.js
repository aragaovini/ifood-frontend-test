import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

describe('List component', () => {
   it('is being rendered correctly', () => {
        shallow(<List />);
    });

    it('is limit state correct', () => {
        const limitProp = 5
        const wrapper = shallow(<List limit={limitProp} />);
        expect(wrapper.state('limit')).toEqual(limitProp)
    });

    it('is total state correct', () => {
        const totalProp = 10
        const wrapper = shallow(<List total={totalProp} />);
        expect(wrapper.state('total')).toEqual(totalProp)
    });

    it('are page numbers state correct', () => {
        const totalProp = 10
        const limitProp = 5
        const wrapper = shallow(<List total={totalProp} limit={limitProp} />);
        expect(wrapper.state('pages')).toEqual(2)
    });
});