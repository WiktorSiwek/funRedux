import expect from 'expect';
import * as authorActions from './authorActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { ENGINE_METHOD_NONE } from 'constants';
import { loadAuthors } from './authorActions';
import { BEGIN_AJAX_CALL } from './actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Author actions', () => {
    describe('loadAuthorActions', () => {
        it('Should create a LOAD_AUTHORS_SUCCESS action', () => {
            const authors = { value: '1', text: '111' };
            const expectedAction = {
                type: types.LOAD_AUTHORS_SUCCESS,
                authors: authors
            };

            const action = authorActions.loadAuthorsSuccess(authors);

            expect(action).toEqual(expectedAction);
        });
    });
});

describe('Async Author Actions', () => {
    describe('loadAuthors', () => {
        afterEach(() => {
            nock.cleanAll();
        });

        it('Should create BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS when loading authors', (done) => {
            const expectedActions = [
                { type: types.BEGIN_AJAX_CALL },
                { type: types.LOAD_AUTHORS_SUCCESS, body: { authors: [{ value: '1', text: '111' }] } }
            ];

            const store = mockStore({ authors: [] }, expectedActions);

            store.dispatch(authorActions.loadAuthors()).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                expect(actions[1].type).toEqual(types.LOAD_AUTHORS_SUCCESS);
                done();
            });
        });
    });
});

