var assert = require('assert');
import 'babel-polyfill';
var deepFreeze = require('deep-freeze');

import recipesReducer from '../app/src/js/reducers/recipes-reducer';

describe('Recipes Reducer', function() {
    it('should set waiting for response to true', function() {
        assert.equal(
            recipesReducer({}, {type:'GET'}).waitingForAddRecipeResponse,
            true
        );
    });
    it('should not affect the existing properties in the state', function() {
        var stateBefore = {'test': 'value'};
        deepFreeze(stateBefore);
        assert.equal(
            recipesReducer(stateBefore, {type:'GET'}).test,
            'value'
        );
    });
});