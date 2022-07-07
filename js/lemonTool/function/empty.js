function isEmpty(variable){
	// console.log('======>>>', 'variable: ', variable);
	if (variable instanceof Error) {
		return variable.message === '';
	}
	if (variable == undefined || variable == null || variable == '') {
		return true;
	}
	if (typeof variable === 'boolean' || typeof variable === 'number') {
		return !variable;
	}
	switch (Object.prototype.toString.call(variable)) {
		// String or Array
		case '[object String]':
		case '[object Array]': {
			return !variable.length;
		}
		// Plain Object
		case '[object Object]': {
			return !Object.keys(variable).length;
		}
		// Map or Set or File
		case '[object File]':
		case '[object Map]':
		case '[object Set]': {
			return !variable.size;
		}
	}
}
export default isEmpty;