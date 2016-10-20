/**
 * Created by catchor on 2016-10-21.
 */

import Utils from '../Utils';

it('name resolver should return internal object values based on string', () => {
	var obj = {
		foo: 'upVal',
		bar: {
			baz: 'inVal'
		}
	};
	expect(Utils.resolveObjectFieldValue(obj, 'foo')).toEqual('upVal');
	expect(Utils.resolveObjectFieldValue(obj, 'bar.baz')).toEqual('inVal');
	expect(Utils.resolveObjectFieldValue(obj, 'bar')).toEqual({baz: 'inVal'});
	expect(Utils.resolveObjectFieldValue(obj, 'bazar')).toBeUndefined()
});