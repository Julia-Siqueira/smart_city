import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Text, View, TextInput, Button, Pressable } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// todas as telas precisam exportar alguma coisa
export default function Home(){
  // COMO O USESTATE FUNCIONA: a primeria variável do array é a que vai ser alterada, e a segunda é a que atualiza essa variável. O que define o estado inicial
  // é o que está dentro de parênteses. 
  const[index, setIndex] = useState('')

  const[getIDG, setIDG] = useState('')
  const[getValorG, setValorG] = useState('')
  const[getTimeG, setTimeG] = useState('')

  const[getID, setID] = useState('')
  const[getValor, setValor] = useState('')
  const[getTime, setTime] = useState('')

  const[token, setToken] = useState('')
  
  useEffect(() => {
    AsyncStorage.getItem('token')
        .then(
            (response) => {
                if(token != null){
                    console.log('Token Home: ', response)
                    setToken(response)
                }
            }
        )
        .catch(
            (error) =>{
                console.error('Erro ao salvar o Token: ', error)
            }
        )
}, [token])



  const capturar = async () =>{
    
      try{
        const response = await axios.get(
          'http://127.0.0.1:8000/upload/umidade/' + index,
        )
        const responseG = await axios.get(
          'http://127.0.0.1:8000/api/genre/' + index,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } // retorna um JSON
        )
        const responseR = await axios.get(
          'http://127.0.0.1:8000/api/age_rating/' + index,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        )

        console.log(response.data)
        setIDG(response.data.title) // pegando o titulo do JSON
        setValorG(responseG.data.genre) // o gênero do JSON
        setTimeG(response.data.year) // o ano do JSON
        setClassifG(responseR.data.age_rating) // a classificação do JSON
        setIdiomaG(response.data.language) // o idioma do JSON
        

    }catch{
      console.log(Error)
    
    } 
    
  }

  const postar = async () =>{
    try{
      const novoFilme = {
        title: getID, // essas são as variáveis que foram alteradas pelo UseState
        genre: getValor,
        year: getTime,
        age_rating: classif,
        language: idioma
      };

      await axios.post(
          'http://127.0.0.1:8000/api/movieslist/', novoFilme, // tem que ser com vírgula, pra não concatenar!!
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
      alert('Filme adicionado')
      setTime('')
      setClassif('')
      setID('')
      setValor('')
      setIdioma('')
      console.log('deu certo')
      
    }catch (error){
      console.log(error)
      alert('Erro ao adicionar o filme');

    }
  };

  const atualizar = async () => {
    try{

      const response = {
        title: getIDG, // pegando as variáveis que o GET trás
        genre: getValorG,
        year: getTimeG,
        age_rating: classifG,
        language: idiomaG,
      }

      await axios.put(
        'http://127.0.0.1:8000/api/movie/' + index, response,
        {
           headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Alterado com sucesso!')

    }catch{
      console.log(Error)
      alert('Erro ao atualizar ', Error)
    }
  }

  const deletar = async () => {
    try{
      const response = await axios.delete(
        'http://127.0.0.1:8000/api/movie/' + index,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      alert('Deletado com sucesso!')

    }catch{
      console.log(Error)
      alert('Erro ao deletar ', Error)
    }
  }


return(
    <View style={styles.container}>

      {/* ====================== A VIEW DO GET COMEÇA AQUI ========================= */}
      <View style={styles.get}>
        {/* AQUI ELE SÓ MOSTRA AS INFORMAÇÕES */}
        

          <Text>GET</Text>
          <View style={{flexDirection: 'row'}}>
          <Text style={{marginBottom: 10, fontWeight: 'bold'}}>ID: </Text>
          <TextInput
            value={index}
            onChangeText={(e) => {setIndex(e)}}
            style={styles.caixaID}
          />

          <Pressable style={styles.btn} onPress={capturar}>
            <Text style={{fontWeight: 'bold', alignItems:'center', color: 'white'}}>GET</Text>
          </Pressable>

          <Pressable style={styles.btnP} onPress={atualizar}>
            <Text style={{fontWeight: 'bold', alignItems:'center', color: 'white'}}>PUT</Text>
          </Pressable>

          <Pressable style={styles.btnD} onPress={deletar}>
            <Text style={{fontWeight: 'bold', alignItems:'center', color: 'white'}}>DELETE</Text>
          </Pressable>

          </View>

          

          <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Filme</Text>
          <TextInput
            value={getIDG}
            style={styles.caixaGet}
            onChangeText={ (e) => setIDG(e)}
          />
          {/* mostrando qual é o filme e também pegando as informações para o PUT */}

          <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Gênero</Text>
          <TextInput
            value={getValorG}
            style={styles.caixaGet}
            onChangeText={ (e) => setValorG(e)}
          />
          {/* mostrando qual é o gênero do fime e também pegando as informações para o PUT*/}

          <View style={styles.global}>
            <View style={styles.aic}>
            <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Ano</Text>
            <TextInput
              value={getTimeG}
              style={styles.caixaGet}
              onChangeText={ (e) => setTimeG(e)}
            />
            {/* mostrando de qual ano é o filme e também pegando as informações para o PUT*/}

            <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Classificação</Text>
            <TextInput
              value={classifG}
              style={styles.caixaGet}
              onChangeText={ (e) => setClassifG(e)}
            />
            {/* mostrando qual é a classificação do filme e também pegando as informações para o PUT*/}

            <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Idioma</Text>
            <TextInput
              value={idiomaG}
              style={styles.caixaGet}
              onChangeText={ (e) => setIdiomaG(e)}
            />
            {/* mostrando qual é o idioma do filme e também pegando as informações para o PUT*/}
            </View>

            <View style={styles.divImagem}>

            </View>

          </View>
          
          
        </View>
        {/* ============================================================================================= */}
       

        {/* =========================== A VIEW DO POST COMEÇA AQUI ====================================== */}
        <View style={styles.post}>
          {/* AQUI A GENTE TÁ DEFININDO AS INFORMAÇÕES */}
          <Text>POST</Text>

          <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Filme</Text>
          <TextInput
            value={getID}
            onChangeText={(e) => {setID(e)}}
            style={styles.caixaGet}
          />
          {/* enquanto a gente digita, ele vai mudando o nome do filme, pegando caractere por caractere */}

          <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Gênero</Text>
          <TextInput
            value={getValor}
            onChangeText={(e) => {setValor(e)}}
            style={styles.caixaGet}
          />
          {/* enquanto digitamos, ele vai definindo o gênero do filme */}

          <View style={styles.global}>
            <View style={styles.aic}>
              <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Ano</Text>
              <TextInput
                value={getTime}
                onChangeText={(e) => {setTime(e)}}
                style={styles.caixaGet}
              />
              {/* enquanto digitamos, ele vai defininfo o ano do filme */}

              <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Classificação</Text>
              <TextInput
                value={classif}
                onChangeText={(e) => {setClassif(e)}}
                style={styles.caixaGet}
              />
              {/* enquanto digitamos, ele vai definindo a classificação do filme */}

              <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Idioma</Text>
              <TextInput
                value={idioma}
                onChangeText={(e) => {setIdioma(e)}}
                style={styles.caixaGet}
              />
              {/* enquanto digitamos, ele vai definindo o idioma do filme */}
              </View>

              <View style={styles.divImagem}>

              </View>
          </View>
          <Pressable style={styles.btnP} onPress={postar}>
            <Text style={{fontWeight: 'bold', alignItems:'center', color: 'white'}}>POST</Text>
          </Pressable>

          </View>
          

          
          {/* ================================================================================= */}

        </View>
       
       
      
    )
}
