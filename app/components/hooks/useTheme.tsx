import { StyleType } from '@typed/styles';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

const useTheme = (styles: StyleType) => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const componentStyle = styles(currentTheme);
  return componentStyle;
};

export default useTheme;
