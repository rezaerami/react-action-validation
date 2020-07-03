import Joi from '@hapi/joi';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var assign = (function (types) {
  return function (validator) {
    if (Array.isArray(types)) {
      return types.reduce(function (result, current) {
        // eslint-disable-next-line no-param-reassign
        result[current] = validator;
        return result;
      }, {});
    }

    return _defineProperty({}, types, validator);
  };
});

var validationGate = (function (validations) {
  return function () {
    return function (next) {
      return function (action) {
        if (!validations[action.type]) {
          next(action);
        } else {
          var validation = new validations[action.type]();
          validation.validate(action.payload).then(function () {
            validation.accept(action.type);
            next(action);
          })["catch"](function (e) {
            console.error(e);
            validation.reject(action.type);
          });
        }
      };
    };
  };
});

var Validator = /*#__PURE__*/function () {
  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Validator);

    this.rules = {};

    if (rules) {
      this.setRules(rules);
    }
  }

  _createClass(Validator, [{
    key: "setRules",
    value: function setRules(rules) {
      this.rules = rules;
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this.rules;
    }
  }, {
    key: "validate",
    value: function () {
      var _validate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Joi.object(this.getRules()).validate(payload);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate(_x) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "accept",
    value: function accept(type) {
      console.log("".concat(type, " accepted!"));
    }
  }, {
    key: "reject",
    value: function reject(type) {
      console.error("".concat(type, " rejected!"));
    }
  }]);

  return Validator;
}();

export { Validator, assign, validationGate };
