import React from 'react';
import { shallow } from 'enzyme';
import Products from './index';

describe('Home - Products', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Products />);
  });

  test('has a section', () => {
    expect(wrapper.find('section')).toHaveLength(1);
  });

  test('has 3 products', () => {
    expect(wrapper.find('article')).toHaveLength(3);
  });
});
