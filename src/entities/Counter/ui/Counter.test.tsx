import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  test('render', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 0 } },
    });
    expect(screen.getByTestId('value-title')).toHaveTextContent('0');
  });

  test('increment', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 0 } },
    });
    const incrementBtn = screen.getByTestId('increment-btn');
    expect(screen.getByTestId('value-title')).toHaveTextContent('0');
    userEvent.click(incrementBtn);
    expect(screen.getByTestId('value-title')).toHaveTextContent('1');
  });

  test('decrement', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 0 } },
    });
    const decrementBtn = screen.getByTestId('decrement-btn');
    expect(screen.getByTestId('value-title')).toHaveTextContent('0');
    userEvent.click(decrementBtn);
    expect(screen.getByTestId('value-title')).toHaveTextContent('-1');
  });
});
