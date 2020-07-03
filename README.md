# react-payload-validation
Validates the payload of a dispatched action

- <a href="#installation">Installation</a>
- <a href="#makingValidators">Making validators</a>
- <a href="#packingValidators">Packing validators</a>
- <a href="#configuration">Configuration</a>

# Usage
You can use the validation using the validationGate middleware or by creating an instance of the validator if you want to use it out of the context of the redux.


<a name="installation"></a>
# 1- Installation
```bash
npm install --save react-action-validation
```

<a name="makingValidators"></a>
# 2- Making Validators
Making validators is easy, you create a class which is extended from to base Validator class, and add the rules property and write your own rules.
be sure you already installed <a href="https://www.npmjs.com/package/@hapi/joi">@hapi/joi</a>.
```bash
npm install --save @hapi/joi
```
- Import Joi.
- Create a class from Validator.
- Write your own rules based on <a href="https://hapi.dev/module/joi/">@hapi/joi docs</a>.
- Assign the validation to a type (or as many types you want).

```javascript
// validations/auth/LoginRequest.js

import Joi from '@hapi/joi';
import { Validator, assign } from 'react-action-validation';

import authTypes  from 'path/to/auth/types'; // path to the files that you wrote your action types

class LoginRequestValidation extends Validator {
  rules = {
    username: Joi.string(),
    password: Joi.string(),
  };
}

export default assign(authTypes.LOGIN)(LoginRequestValidation);

```
**Note: the assign function accepts array to assign the validation to multiple types**

```javascript
export default assign([FOO_TYPE, BAR_TYPE])(CustomValidation);
```

**Note: I recommend you to separate the validation directories from your component and other layers of your app.
so in this example, the validators are in a directory called validations in the root of my app.**


<a name="packingValidators"></a>
# 3- Packing validators
To register al the validators to the validationGate middleware, you should pack them all in an object and export it.
```javascript
// configureValidation.js
import FooValidation from 'path/to/FooValidation';
import BarValidation from 'path/to/BarValidation';

export default {
  ...FooValidation,
  ...BarValidation
};

```


<a name="configuration"></a>
# 4- Configuration
First of all you need to add the validationGate to your middlewares.
```javascript
// ...

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// ...

import { validationGate } from 'react-action-validation';

// ...

import validations from 'path/to/configureValidation';

// ...

const validator = validationGate(validations);

// ...

const middlewares = [
  validator,
  // other middlewares
]

const store = createStore(
  reducer,
  applyMiddleware(middlewares)
)

// rest unchanged
```

# Using out of redux
You're also able to use it without any custom validation classes and middleware, you can simply create an instance from the Validator class and pass your rules.
```jsx
import React, {useState} from 'react';
import Joi from '@hapi/joi';
import { Validator } from 'react-action-validation'

const MyFormComponent = props => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const rules = {
      name: Joi.string(),
    }
    const validator = new Validator(rules);
    validator.validate({
      name
    })
    .then(() => setMessage('name is valid'))
    .catch(() => setMessage('name is invalid'));
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      <input
        placeholder="enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">submit</button>
      {!!message && <p>{message}</p>}
    </form>
  );
};

export default MyFormComponent;
```
