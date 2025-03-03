import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useDispatch();

    const counterValue = useSelector((state: StateSchema) => state.counter.value);

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
                {counterValue}
            </h1>
            <Button onClick={increment}>
                +
            </Button>
            <Button onClick={decrement}>
                -
            </Button>
        </div>
    );
};
