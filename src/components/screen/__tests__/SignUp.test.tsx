import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
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

import AppContext from '../../../providers/AppProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { MockPayloadGenerator } from 'relay-test-utils';
import SignUp from '../SignUp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[SignUp] Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<SignUp {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[SignUp] Interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<SignUp {...props} />);
    testingLib = render(component);
  });

  it('should invoke changeText event when email changed', async () => {
    const textInput = testingLib.getByTestId('input-email');
    await waitForElement(() => textInput);

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event when password changed', async () => {
    const passwordFirstText = testingLib.getByTestId('input-password-first');
    await waitForElement(() => passwordFirstText);

    act(() => {
      fireEvent.changeText(passwordFirstText, 'password-first');
    });
    const passwordSecondText = testingLib.getByTestId('input-password-second');
    await waitForElement(() => passwordSecondText);

    act(() => {
      fireEvent.changeText(passwordSecondText, 'password-second');
    });

    expect(passwordFirstText.props.value).toEqual('password-first');
    expect(passwordSecondText.props.value).toEqual('password-second');
  });

  it('should call setChecked when Checkbox is clicked', async () => {
    const checkBox = testingLib.getByTestId('checkbox-agreement');
    await waitForElement(() => checkBox);

    act(() => {
      fireEvent.press(checkBox);
    });

    expect(
      checkBox.props.children[0].props.children.props.checked,
    ).toBeTruthy();
  });

  describe('onSignUp', () => {
    beforeAll(() => {
      testingLib = render(component);
      jest.spyOn(AsyncStorage, 'setItem').mockImplementation(jest.fn());
      jest.spyOn(AppContext, 'useAppContext').mockImplementation(() => ({
        state: {
          user: null,
        },
        setUser: jest.fn().mockReturnValue({
          id: 'userId',
          email: 'email@email.com',
        }),
        resetUser: jest.fn(),
        callDefault: jest.fn(),
      }));
    });

    it('should make request to signin when button has pressed and navigation switchs to [MainStack]', async () => {
      const emailText = testingLib.getByTestId('input-email');
      await waitForElement(() => emailText);

      act(() => {
        fireEvent.changeText(emailText, 'email@email.com');
      });

      const passwordFirstText = testingLib.getByTestId('input-password-first');
      await waitForElement(() => passwordFirstText);

      act(() => {
        fireEvent.changeText(passwordFirstText, 'password');
      });

      const passwordSecondText = testingLib.getByTestId(
        'input-password-second',
      );
      await waitForElement(() => passwordSecondText);

      act(() => {
        fireEvent.changeText(passwordSecondText, 'password');
      });

      const checkBox = testingLib.getByTestId('checkbox-agreement');
      await waitForElement(() => checkBox);

      act(() => {
        fireEvent.press(checkBox);
      });

      const submitBtn = testingLib.getByTestId('btn-submit');
      await waitForElement(() => submitBtn);

      act(() => {
        fireEvent.press(submitBtn);

        environment.mock.resolveMostRecentOperation((operation) =>
          MockPayloadGenerator.generate(operation),
        );
      });

      // const operation = environment.mock.getMostRecentOperation();
      // environment.mock.resolve(
      //   operation,
      //   MockPayloadGenerator.generate(operation),
      // );
    });

    it('should fail request to signin when button has pressed with wrong info and show error text', async () => {
      const emailText = testingLib.getByTestId('input-email');
      await waitForElement(() => emailText);

      act(() => {
        fireEvent.changeText(emailText, 'wrong@email.com');
      });

      const passwordFirstText = testingLib.getByTestId('input-password-first');
      await waitForElement(() => passwordFirstText);

      act(() => {
        fireEvent.changeText(passwordFirstText, 'password');
      });

      const passwordSecondText = testingLib.getByTestId(
        'input-password-second',
      );
      await waitForElement(() => passwordSecondText);

      act(() => {
        fireEvent.changeText(passwordSecondText, 'password');
      });

      const checkBox = testingLib.getByTestId('checkbox-agreement');
      await waitForElement(() => checkBox);

      act(() => {
        fireEvent.press(checkBox);
      });

      const submitBtn = testingLib.getByTestId('btn-submit');
      await waitForElement(() => submitBtn);

      act(() => {
        fireEvent.press(submitBtn);
        environment.mock.rejectMostRecentOperation(new Error('reject error'));
      });

      const errorText = testingLib.getByTestId('text-error');
      await waitForElement(() => errorText);

      expect(errorText).toBeTruthy();
    });

    afterEach((done) => {
      cleanup();
      done();
    });
  });
});
