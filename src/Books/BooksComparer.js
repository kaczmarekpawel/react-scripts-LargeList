/**
 * Created by catchor on 2016-10-20.
 */

import {resolveObjectFieldValue} from '../Utils'

export const compareBooks = function (b1, b2, sortBy) {
	var v1 = resolveObjectFieldValue(b1, sortBy),
		v2 = resolveObjectFieldValue(b2, sortBy);

	if (v1 > v2) return -1;
	else if (v1 < v2) return 1;
	else return 0;
};

export default {compareBooks}
