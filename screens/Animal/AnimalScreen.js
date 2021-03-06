import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebaseDB';


class AnimalScreen extends Component {
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('animal');
        this.state = {
          isLoading: true,
          animalArr: []
        };
      }
    
      componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const animalArr = [];
        querySnapshot.forEach((res) => {
          const { nombre, especie, edad, tiempo, lugar, habitat, padecimiento,} = res.data();
          animalArr.push({
            key: res.id,
            res,
            nombre, especie, edad, tiempo, lugar, habitat, padecimiento,
          });
        });
        this.setState({
          animalArr,
          isLoading: false,
       });
      }
    
      render() {
        if(this.state.isLoading){
          return(
            <View style={styles.preloader}>
              <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
          )
        }    
        return (
          <ScrollView style={styles.container}>
              {
                this.state.animalArr.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      chevron
                      bottomDivider
                      title={item.nombre}
                      subtitle={item.especie}
                      onPress={() => {
                        this.props.navigation.navigate('AnimalDetailScreen', {
                          animalkey: item.key
                        });
                      }}/>
                  );
                })
              }
          </ScrollView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
       flex: 1,
       paddingBottom: 22
      },
      preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      }
    })

export default AnimalScreen;