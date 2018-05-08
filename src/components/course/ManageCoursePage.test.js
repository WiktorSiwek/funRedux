import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';
import sinon from 'sinon';

describe('Manage Course Page', () => {

    function setup(course = {}, authors = [], actions = {}) {
        const props = {
            course: course,
            authors: authors,
            actions: actions
        };

        return mount(<ManageCoursePage {...props} />);
    }

    describe('courseFormIsValid', () => {
        it('Should set error message when trying to save empty title', () => {
            const wrapper = setup(
                { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' },
                [],
                { saveCourse: () => { return Promise.resolve(); } }
            )
            const saveButton = wrapper.find('input').last();
            expect(saveButton.prop('type')).toBe('submit');
            saveButton.simulate('click');
            expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
        });
    });


    describe('componentWillReceiveProps', () => {
        it('Component should call componentWillReceiveProps on update', () => {
            const wrapper = setup();

            const spy = sinon.spy(ManageCoursePage.prototype, "componentWillReceiveProps");
            expect(spy.calledOnce).toEqual(false);
            wrapper.setProps({ course: {} });
            expect(spy.calledOnce).toEqual(true);
        });
        it('After recieving props state should change without a mutation', () => {
            const wrapper = setup(
                { id: "123", title: "123" },
                [],
                {}
            );

            const newCourse = { id: '123', title: 'New' };

            wrapper.setProps({ course: newCourse });
            expect(wrapper.node.props.course.title).toBe('New');
        });
    });
    
});
