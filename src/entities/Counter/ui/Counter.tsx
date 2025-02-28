import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Counter.module.scss';

interface CounterProps {
    className?: string;
}

export const Counter = ({ className }: CounterProps) => (
    <div className={classNames(cls.Counter, {}, [className])} />
);
