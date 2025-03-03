import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const dispatch = useDispatch();

  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <h1>
        value =
        {` ${counterValue}`}
      </h1>
      <Button onClick={decrement}>
        -
      </Button>
      <Button onClick={increment}>
        +
      </Button>
    </div>
  );
};
