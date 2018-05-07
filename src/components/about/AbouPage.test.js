import AboutPage from './AboutPage';
import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'expect';

describe('AboutPage', () => {
    const about = shallow(<AboutPage />)
    it('checks page loading', () => {
        expect(about).toMatchSnapshot();
    })
})
