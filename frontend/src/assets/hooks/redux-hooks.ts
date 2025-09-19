import { useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store/index';
import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();