import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import nfcManager, {NfcTech, } from 'react-native-nfc-manager';
import { useState } from 'react';
import serialNumberCard from './src/validCardNumber.js';

export default function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [bytes, setByes] = useState([])
 

  async function readNdef() {
    try {
        if(!nfcManager.isSupported)
          return 'Your device not in supported to NFC'
      // register for the NFC tag with NDEF in it
      await nfcManager.requestTechnology(NfcTech.MifareClassic);

      
      // the resolved tag object will contain `ndefMessage` property
      const autentica = await nfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(0, [255,255,255,255,255,255]);
      const tag = await nfcManager.mifareClassicHandlerAndroid.mifareClassicReadBlock(0)
      setByes(tag)
      const cardNumber =  serialNumberCard(tag)
      setCardNumber(cardNumber)
      
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      nfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
    <TouchableOpacity onPress={readNdef}>
      <Text >Scan a Tag</Text>
      <Text style={styles.button}>{cardNumber}</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    color: '#f0f',
  },
});
