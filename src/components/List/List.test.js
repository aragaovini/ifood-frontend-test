import React from 'react';
import { shallow, mount } from 'enzyme';
import List from './List';

const items = [
    { name: 'playlists 1', external_urls: '#' },
    { name: 'playlists 2', external_urls: '#' },
    { name: 'playlists 3', external_urls: '#' },
    { name: 'playlists 4', external_urls: '#' }
]

describe('List component', () => {
   it('is being rendered correctly', () => {
        shallow(<List />);
    });

    it('playlists are being rendered correctly', () => {
        const limit = 10
        const wrapper = mount(<List 
            limit={limit} 
            total={items.length}
            offset={0}
            items={items}/>)
        expect(wrapper.find('.col').length).toBe(items.length)
    })

    it('are page numbers correct', () => {
        const limit = 1
        const pagesTotal = 4
        const wrapper = mount(<List 
            limit={limit} 
            total={items.length}
            offset={0}
            items={items}/>)
        expect(wrapper.state('pages')).toBe(pagesTotal)
    })

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

    it('are page numbers correct by total and limit prop', () => {
        const totalProp = 10
        const limitProp = 5
        const wrapper = shallow(<List total={totalProp} limit={limitProp} />);
        expect(wrapper.state('pages')).toEqual(2)
    });
});