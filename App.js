import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, ScrollView, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Tier List');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const TierListScreen = ({ navigation }) => {
  const [tiers, setTiers] = useState([
    { title: 'Tier S', data: [{ name: 'Ruan Mei', image: require('./assets/RuanMei.jpeg') }, { name: 'Huo Huo', image: require('./assets/Huo.jpeg') }, { name: 'Hotaru', image: require('./assets/Hotaru.jpeg') }, { name: 'Kafka', image: require('./assets/KAFKA.jpeg') }, { name: 'Acheron', image: require('./assets/Acheron.jpeg') }, { name: 'Jing Liu', image: require('./assets/Jingliu.jpeg') }, { name: 'Silver Wolf', image: require('./assets/SW.jpeg') }] },
    { title: 'Tier A', data: [{ name: 'Bronya', image: require('./assets/Bronya.jpeg') }, { name: 'Black Swan', image: require('./assets/BS.jpeg') }, { name: 'Robin', image: require('./assets/Robin.jpeg') }, { name: 'Lynx', image: require('./assets/lynx.jpeg') }, { name: 'seele', image: require('./assets/seele.jpeg') }] },
  ]);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView>
      {tiers.map((tier) => (
        <View key={tier.title}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>{tier.title}</Text>
          <FlatList
            data={tier.data}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const AddTierScreen = () => {
  const [newTierTitle, setNewTierTitle] = useState('');
  const [newTierData, setNewTierData] = useState([]);

  const handleAddTier = () => {
    if (newTierTitle && newTierData.length) {
      setTiers([...tiers, { title: newTierTitle, data: newTierData }]);
      setNewTierTitle('');
      setNewTierData([]);
    }
  };

  return (
    <View>
      <TextInput
        value={newTierTitle}
        onChangeText={(text) => setNewTierTitle(text)}
        placeholder="Judul Tier"
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <TextInput
        value={newTierData.join(', ')}
        onChangeText={(text) => setNewTierData(text.split(', '))}
        placeholder="Masukkan data tier, pisahkan dengan koma"
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <Button title="Tambah Tier" onPress={handleAddTier} />
    </View>
  );
};

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View>
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP._1L0-SdG0-Zd4m4f_xlSiAHaEK?rs=1&pid=ImgDetMain' }}
        style={{ width: 100, height: 100 }}
      />
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Nama"
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Tier List" component={TierListScreen} />
        <Tab.Screen name="Tambah Tier" component={AddTierScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
