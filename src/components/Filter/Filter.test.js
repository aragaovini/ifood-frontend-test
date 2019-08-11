import React from 'react';
import { shallow, mount } from 'enzyme';
import Filter from './Filter';
import { Form, FormGroup } from 'react-bootstrap';

const filters = [
  {
    id: 'locale',
    name: 'Locale',
    values: [
      {
        value: 'en_AU',
        name: 'en_AU'
      }
    ]
  },
  {
    id: 'country',
    name: 'País',
    values: [
      {
        value: 'AU',
        name: 'Australia'
      }
    ]
  },
  {
    id: 'timestamp',
    name: 'Data e Horário',
    validation: {
      primitiveType: 'STRING',
      entityType: 'DATE_TIME',
      pattern: 'yyyy-MM-ddTHH:mm:ss'
    }
  },
  {
    id: 'limit',
    name: 'Quantidade',
    validation: {
      primitiveType: 'INTEGER',
      min: 1,
      max: 50
    }
  },
  {
    id: 'offset',
    name: 'Página',
    validation: {
      primitiveType: 'INTEGER'
    }
  }
];

const handleInputChangeFunction = jest.fn((field, value) => value);

const wrapper = mount(
  <Filter
    filters={filters}
    handleFieldsChange={(field, value) =>
      handleInputChangeFunction(field, value)
    }
  />
);

describe('List component', () => {
  it('is being rendered correctly', () => {
    shallow(<Filter />);
  });

  it('is fields total correct', () => {
    // -1 because we have pagination component, not a field for it
    expect(wrapper.find('form').children().length).toBe(filters.length - 1);
  });

  it('is field change function being called', () => {
    const firstField = wrapper.find(Form.Control).first();
    firstField.props().onChange({ target: { value: 'en_AU' } });
    expect(handleInputChangeFunction.mock.calls.length).toBe(1);
  });

  it('is field change function being called', () => {
    const field = wrapper
      .find(FormGroup)
      .at(1)
      .find(Form.Control);
    field.props().onChange({ target: { value: 'AU' } });
    expect(handleInputChangeFunction.mock.results[1].value).toBe('AU');
  });
});
