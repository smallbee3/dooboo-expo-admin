import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from '@testing-library/react-native';
import {
  createTestElement,
  createTestProps,
  environment,
} from '../../../../test/testUtils';

import FindPassword from '../FindPassword';
import { MockPayloadGenerator } from 'relay-test-utils';
import { act } from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[FindPassword] Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<FindPassword {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

// describe('[FindPassword] Interaction', () => {
//   beforeEach(() => {
//     props = createTestProps();
//     component = createTestElement(<FindPassword {...props} />);
//     testingLib = render(component);
//   });

//   it('should invoke changeText when email changed', async () => {
//     const emailText = testingLib.getByTestId('input-email');
//     await waitForElement(() => emailText);

//     act(() => {
//       fireEvent.changeText(emailText, 'email@email.com');
//     });

//     expect(emailText.props.value).toEqual('email@email.com');
//   });

//   it('should make request to findPassword when button has pressed', async () => {
//     const emailText = testingLib.getByTestId('input-email');
//     await waitForElement(() => emailText);

//     act(() => {
//       fireEvent.changeText(emailText, 'email@email.com');
//     });

//     const submitBtn = testingLib.getByTestId('btn-submit');
//     await waitForElement(() => submitBtn);

//     act(() => {
//       fireEvent.press(submitBtn);

//       environment.mock.resolveMostRecentOperation((operation) => {
//         MockPayloadGenerator.generate(operation);
//       });
//     });
//   });

//   afterAll((done) => {
//     cleanup();
//     done();
//   });
// });
