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

import Help from '../Help';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[Help] Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Help {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[Help] Interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Help {...props} />);
    testingLib = render(component);
  });
});
