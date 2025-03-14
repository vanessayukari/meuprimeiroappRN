import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const HeaderContainer = styled.View`
  background-color: #687339;
  padding-top: ${StatusBar.currentHeight}px;
  padding: 20px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;