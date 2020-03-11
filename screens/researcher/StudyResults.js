import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import { Table, Row, Rows } from 'react-native-table-component';



export default function StudyResults({navigation}) {

    const [reload, setReload] = useState(false)
    const [results, setResults] = useState([])
    const [tableData, setTableData] = useState([])
    const tableHead = ['Age', 'Congruent RT', 'Gender', 'Global RT', 'Incongruent RT', 'Languages']
    const testData = [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]

    useEffect(()=>{
        var db = firebase.firestore()
        // var participants = db.collection('participants')
        var entries = db.collectionGroup('entries').where('studyID', '==', navigation.getParam('currentStudyID'));
        entries.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, ' => ', doc.data())
                setResults(results =>[...results, doc.data()])
                console.log(results, '.......................')
                // formatResults()

                // setReload(true)
                    // results.forEach(function(result){
                    //     setTableData(tableData=>[...tableData, Object.values(result)])
                    // })   
            })
            if(tableData.length == 0){
                setReload(true)
                for (var i =0; i<results.length; i++) {
                    setTableData(tableData=>[...tableData, Object.values(results[i]).slice(0,-1)])
                    // tableData.push(Object.values(results[i]))
                    console.log(tableData, '=====================')
    
                }
            }
        })
        // .then(()=>{
        //     console.log('moving on')


        // })
        
        //convert to array
        // var tableData = []
        console.log('ummmmm')
        // for (var i =0; i<results.length; i++) {

        //     // setTableData(tableData=>[...tableData, Object.values(results[i])])
        //     // tableData.push(Object.values(results[i]))
        //     console.log(results[i], '=====================')
        // }
        // var rowData = Object.values(results)
    },[reload])
    
    // function formatResults(){
        
    //     for (var i =0; i<results.length; i++) {
    //         setTableData(tableData=>[...tableData, Object.values(results[i])])
    //         // tableData.push(Object.values(results[i]))
    //         console.log(tableData, '=====================')
    //     }
    // }


    console.log('results are ', results)
    return(
        // <View>
        //     <Text> Results: </Text>

            <View style={styles.container}>
                 <Text> Results: </Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={tableData} textStyle={styles.text}/>
                </Table>
            </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 16,
        paddingTop: 30, 
        backgroundColor: '#fff' 
    },
    head: { 
        height: 40, 
        backgroundColor: '#f1f8ff' 
    },
    text: { 
        margin: 6 
    }
});