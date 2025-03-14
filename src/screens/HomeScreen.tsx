import React, { useState } from 'react';
import { ScrollView, FlatList, Alert, Button } from 'react-native';
import styled from 'styled-components/native';
import { HeaderContainer, HeaderTitle } from '../components/Header';

interface Item {
  id: string;
  text: string;
  quantity: string; 
  checked: boolean;
}

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(''); 
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: 'Macarrão', quantity: '1', checked: false },
    { id: '2', text: 'Ovo', quantity: '12', checked: false },
  ]);

  const addItem = () => {
    if (text.trim() && quantity.trim()) {
      setItems([
        ...items,
        { id: Date.now().toString(), text, quantity, checked: false },
      ]);
      setText('');
      setQuantity('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha o nome e a quantidade do item.');
    }
  };

  const toggleChecked = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Lista de Mercado</HeaderTitle>
      </HeaderContainer>

      <Content>
        <Input
          placeholder="Item"
          onChangeText={setText}
          value={text}
        />
        <Input
          placeholder="Quantidade"
          onChangeText={setQuantity}
          value={quantity}
          keyboardType="numeric"
        />

        <AddButton onPress={addItem}>
          <ButtonText>Incluir na Lista</ButtonText>
        </AddButton>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem onPress={() => toggleChecked(item.id)}>
              <Checkbox
                checked={item.checked}
                onPress={() => toggleChecked(item.id)}
              />
              <ListItemText
                style={{
                  color: item.checked ? '#6c757d' : '#000000',
                }}
              >
                {item.text} - {item.quantity} {item.checked ? 'Ok! :)' : ''}
              </ListItemText>
              <DeleteButton onPress={() => deleteItem(item.id)}>
                <DeleteButtonText>-</DeleteButtonText>
              </DeleteButton>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: #C2C8A6;
`;

const Content = styled.View`
  padding: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #313326;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

const ListItem = styled.TouchableOpacity`
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ListItemText = styled.Text`
  font-size: 16px;
  flex: 1;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: #F2C6C2;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 30;
`;

const Checkbox = styled.TouchableOpacity<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid #687339;
  border-radius: 5px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ checked }) => (checked ? '#687339' : 'transparent')};
`;

export default HomeScreen;
