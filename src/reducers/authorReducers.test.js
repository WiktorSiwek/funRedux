import expect from 'expect';
import authorReducer from './authorReducer';
import * as actions from '../actions/authorActions';

describe('Author Reducer', () => {
    it('Should load', () => {
        const initialState = [
            { name: 'Old' }
        ];

        const newAuthor = { name: "New"};

        const action = actions.loadAuthorsSuccess(newAuthor);

        const newState = authorReducer(initialState, action);

        expect(newState).toEqual(newAuthor);
    });
});
