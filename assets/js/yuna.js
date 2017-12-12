/**
 * Initialization of Yuna Namespace
 */
(function() {
	var _global = this;
	
	if (_global.Yuna === undefined)
	{
	  _global.Yuna = {};
	}
	
	Yuna.global = _global;
	Yuna.singleton = Yuna;
  
	/**
	 * Copies all properties (or method) in config or defaults into receiver. Act as internal utility for class creation.
	 *
	 * @method
	 * @param {object}  receiver The target object to receive the copy.
	 * @param {object}  config   The object to be copied.
	 * @param {object}  defaults If sepecified, the default object will be used instead of config.
	 *
	 * @return receiver The target object with new applied properties.
	 */
	Yuna.apply = function(receiver, config, defaults) {
	  if (defaults) {
		Yuna.apply(receiver, defaults);
	  }
	  
	  if (receiver && config && config.constructor === Object) {
		if (receiver === null) {
		  receiver = {};
		}
		var i;
		for (i in config) {
		  receiver[i] = config[i];
		}
	  }
	  
	  return receiver;
	};
  })();
  
  
  Yuna.apply(Yuna, {
	emptyFn: function() {},
  
	/**
	 * Validate the specified value by returning true if the specified value is Array. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isArray: function(value) {
	  return value.constructor == Array;
	},
	/**
	 * Validate the specified value by returning true if the specified value is Object. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isObject: function(value) {
	  return value.constructor == Object;
	},
	/**
	 * Validate the specified value by returning true if the specified value is Number. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isNumber: function(value) {
	  return value.constructor == Number;
	},
	/**
	 * Validate the specified value by returning true if the specified value is String. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isString: function(value) {
	  if (value !== undefined) return value.constructor == String;
	  else return false;
	},
	/**
	 * Validate the specified value by returning true if the specified value is Boolean. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isBoolean: function(value) {
	  return value.constructor == Boolean;
	},
	/**
	 * Validate the specified value by returning true if the specified value is Date. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isDate: function(value) {
	  return value.constructor == Date;
	},
	/**
	 * Validate the specified value by returning true if the specified value is Function. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isFunction: function(value) {
	  return value.constructor == Function;
	},
	/**
	 * Validate the specified value by returning true if the specified value is null. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isNull: function(value) {
	  return value === null;
	},
	/**
	 * Validate the specified value by returning true if the specified value is undefined. Otherwise, will return false.
	 * @method
	 * @static
	 * @param {any} value Any value to validate
	 * @return {Boolean}
	 */
	isUndefined: function(value) {
	  return value === undefined;
	},
	/**
	 * Validate the specified value by returning true if the specified value is empty. Otherwise, will return false. Empty value are:
	 * <ul>
	 * <li>null</li>
	 * <li>undefined</li>
	 * <li>an empty array</li>
	 * <li>an empty string</li>
	 * </ul>
	 * @method
	 * @static
	 * @param {any} value Any value to validate.
	 * @return {Boolean} The value of the validation.
	 */
	isEmpty: function(value) {
	  return (value === null) || (Yuna.isArray(value) && value.length === 0) || (Yuna.isUndefined(value) || (Yuna.isString(value) && value === ""));
	},
  
	createCallback: function(func, context, argCount) {
	  if (context === void 0) return func;
	  switch (argCount === null ? 3 : argCount) {
		case 1: return function(value) {
		  return func.call(context, value);
		};
		case 2: return function(value, other) {
		  return func.call(context, value, other);
		};
		case 3: return function(value, index, collection) {
		  return func.call(context, value, index, collection);
		};
		case 4: return function(accumulator, value, index, collection) {
		  return func.call(context, accumulator, value, index, collection);
		};
	  }
	  return function() {
		return func.apply(context, arguments);
	  };
	},
  
	property: function(key) {
	  return function(obj) {
		return obj[key];
	  };
	},
  
	has: function(obj, key) {
	  return obj !== null && hasOwnProperty.call(obj, key);
	},
  
	keys: function(obj) {
	  if (!Yuna.isObject(obj)) return [];
	  if (Object.keys) return Object.keys(obj);
	  var keys = [];
	  for (var key in obj) if (Yuna.has(obj, key)) keys.push(key);
	  return keys;
	},
  
	pairs: function(obj) {
	  var keys = Yuna.keys(obj);
	  var length = keys.length;
	  var pairs = Array(length);
	  for (var i = 0; i < length; i++) {
		pairs[i] = [keys[i], obj[keys[i]]];
	  }
	  return pairs;
	},
  
	matches: function(attrs) {
	  var pairs = Yuna.pairs(attrs), length = pairs.length;
	  return function(obj) {
		if (obj === null) return !length;
		obj = new Object(obj);
		for (var i = 0; i < length; i++) {
		  var pair = pairs[i], key = pair[0];
		  if (pair[1] !== obj[key] || !(key in obj)) return false;
		}
		return true;
	  };
	},
  
	iteratee: function(value, context, argCount) {
	  if (value === null) return Yuna.emptyFn;
	  if (Yuna.isFunction(value)) return Yuna.createCallback(value, context, argCount);
	  if (Yuna.isObject(value)) return Yuna.matches(value);
	  return Yuna.property(value);
	},
  
	/**
	 * Will look whether the current DOM have a given element.
	 * @method
	 * @static
	 * @param {string} value The ID of target element with their JQuery-styled of class and ID (the '.' and '#' leading character).
	 * @return {Boolean} The value of target element existence.
	 */
	hasElement: function(value) {
	  var leading = value.charAt(0), result = false;
  
	  switch (leading) {
		case '#':
		  if (document.getElementById(value.substr(1))) return true;
		break;
		case '.':
		  var elems = document.getElementsByTagName('*'), i;
		  for (i in elems) {
			if ((' ' + elems[i].className + ' ').indexOf(' ' + value.substr(1) +' ') > -1) return true;
		  }
		break;
	  }
	  return result;
	}
  });
  
  (function() {
	Yuna.Array = {
	  map: function(obj, iteratee, context) {
		if (obj === null) return [];
		iteratee = Yuna.iteratee(iteratee, context);
		var keys = obj.length !== +obj.length && Yuna.keys(obj),
			length = (keys || obj).length,
			results = Array(length),
			currentKey;
		for (var index = 0; index < length; index++) {
		  currentKey = keys ? keys[index] : index;
		  results[index] = iteratee(obj[currentKey], currentKey, obj);
		}
		return results;
	  }
	};
  })();
  
  
  (function(){
  
	Yuna.Object = {
	  
	  clone: function(item) {
	  },
	  
	  /**
	   * Merging specified object into {origin} object.
	   * @method
	   * @static
	   * @param {object} origin A receiver object that receive the merged object.
	   * @param {object} target An object that will be merged into {origin}.
	   * @return {object} A new merged object.
	   */
	  mergeObject: function(origin) {
		for (var i = 1, j = arguments.length; i < j; i++){
		  var obj = arguments[i];
		  for (var key in obj) {
			if (Yuna.isObject(obj[key])) Yuna.Object.mergeObject(origin, key, obj[key]);
			else Yuna.Object.mergeValue(origin, key, obj[key]);
		  }
		}
		return origin;
	  },
	  
	  /**
	   * Merging specified key-value pair into {origin} object.
	   * @method
	   * @static
	   * @param {object}  origin  A receiver object that receive the merged object.
	   * @param {string}  key     A string of named variable. This will be used as variable name in the merged object.
	   * @param {any}     value   A named value. This will be used as value in the merged object.
	   * @return {object} A new merged object.
	   */
	  mergeValue: function(origin, key, value) {
		if (Yuna.isString(key)) {
		  if (Yuna.isObject(value) && Yuna.isObject(origin[key])) {
			Yuna.Object.mergeObject(origin[key], value);
		  }
		  else {
			origin[key] = value;
		  }
		}
		else {
		  origin[key] = value;
		}
		return origin;
	  }
	};
  })();

  console.log('Yuna applied');