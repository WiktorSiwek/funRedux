import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            const course = { id: 'clean-code', title: 'Clean Code' };
            const expectedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            const action = courseActions.createCourseSuccess(course);

            expect(action).toEqual(expectedAction);
        });
    });
    describe('loadCourseSuccess', () => {
        it('Should create a LOAD_COURSES_SUCCESS action', () => {
            const courses = { id: 'clean-code', title: 'Clean Code' };
            const expectedAction = {
                type: types.LOAD_COURSES_SUCCESS,
                courses: courses
            };

            const action = courseActions.loadCoursesSuccess(courses);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('updateCourseSuccess', () => {
        it('Should create a UPDATE_COURSES_SUCCESS action', () => {
            const course = { id: '1', title: '111' };

            const expectedAction = {
                type: types.UPDATE_COURSE_SUCCESS,
                course: course
            }

            const action = courseActions.updateCourseSuccess(course)
            expect(action).toEqual(expectedAction);
        });
    });

});

//Testing thunks

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('Async Course Actions', () => {
    describe('loadCourses', () => {
        afterEach(() => {
            nock.cleanAll(); // W funkcjach async wazne jest by czyscic kod po kazdym wykonaniu
        });

        it('Should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => { //Done to callback, wykona sie kiedy async sie skonczy
            /*  Here's an expample call to nock.
                nock('https://example.com/')
                    .get('/courses')
                    .reply(200, {body: {course: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }}); //hardcoded response we want to check answer for
            */

            //1. Declare an array of actions that we're expecting as part of this thunk
            const expectedActions = [
                { type: types.BEGIN_AJAX_CALL },
                { type: types.LOAD_COURSES_SUCCESS, body: { courses: [{ id: 'clean-code', title: 'Clean Code' }] } }
            ];

            //2. Using mockStore
            const store = mockStore({ courses: [] }, expectedActions);

            //3. Test

            store.dispatch(courseActions.loadCourses()).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
                //4. Done, it ends async flow
                done();
            });
        });
    });

    describe('saveCourses', () => {
        afterEach(() => {
            nock.cleanAll();
        });
        it('Should create BEGIN_AJAX_CALL, UPDATE_COURSE_SUCCESS actions when successfully updating course', (done) => {
            const course = { id: '1', title: '111' };

            const expectedActions = [
                { type: types.BEGIN_AJAX_CALL },
                { type: types.UPDATE_COURSE_SUCCESS },
            ];

            const store = mockStore({ courses: [] }, expectedActions);
            store.dispatch(courseActions.saveCourse(course)).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                expect(actions[1].type).toEqual(types.UPDATE_COURSE_SUCCESS);
                done();
            });
        });
        it('Should create BEGIN_AJAX_CALL, CREATE_COURSE_SUCCESS actions when successfully saving course', (done) => {
            const course = { title: '111' };

            const expectedActions = [
                { type: types.BEGIN_AJAX_CALL },
                { type: types.CREATE_COURSE_SUCCESS }
            ];

            const store = mockStore({ courses: [] }, expectedActions);
            store.dispatch(courseActions.saveCourse(course)).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                expect(actions[1].type).toEqual(types.CREATE_COURSE_SUCCESS);
                done();
            });
        });

        //NIE DZIALA
        // it('Should create BEGIN_AJAX_CALL, AJAX_CALL_ERROR actions when failed ajax call', (done) => {
        //     const course = { id: '', title: '' };

        //     const expectedActions = [
        //         { type: types.BEGIN_AJAX_CALL },
        //         { type: types.AJAX_CALL_ERROR }
        //     ];

        //     const store = mockStore({ courses: [] }, expectedActions);
        //     store.dispatch(courseActions.saveCourse(course)).then(() => {
        //         const actions = store.getActions();
        //         expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        //         expect(actions[1].type).toEqual(types.AJAX_CALL_ERROR);
        //         done();
        //     });
        // });    
    });
});
