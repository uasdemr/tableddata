import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../stote/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
