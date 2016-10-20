/**
 * Created by catchor on 2016-10-20.
 */

export const resolveObjectFieldValue = (object, fieldName) =>
	fieldName.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : undefined;
	}, object || self);

export default {resolveObjectFieldValue}
