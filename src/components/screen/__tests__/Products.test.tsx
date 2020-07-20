import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  render,
} from '@testing-library/react-native';
import {
  createTestElement,
  createTestProps,
} from '../../../../test/testUtils';

import Products from '../Products';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[Products] Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Products {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[Products] Interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Products {...props} />);
    testingLib = render(component);
  });
});
