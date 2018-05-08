import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import SelectInput from './SelectInput';

function setup(error) {
    const props = {
        name: '',
        label: '',
        onChange: () => {},
        defaultOption: '',
        value: '',
        error: error,
        options: [{}]
    };

    return shallow(<SelectInput {...props} />);
}

describe('Select Input', () => {
    it('Should render 2 div, 1 label and 1 select', () => {
        const wrapper = setup();
        expect(wrapper.find('div').length).toBe(2);
        expect(wrapper.find('label').length).toBe(1);
        expect(wrapper.find('select').length).toBe(1);
    });
    it('Error div should have vlaue with error string if error exist', () => {
        const wrapper = setup('error');
        expect(wrapper.find('div.alert').text()).toBe('error');
    });
    it('Error div should not exist if error does not exist', () => {
        const wrapper = setup();
        expect(wrapper.find('div.alert').exists).toBe(undefined);
    });

});
