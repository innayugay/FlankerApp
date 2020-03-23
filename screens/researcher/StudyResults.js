import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import { Table, Row, Rows, TableWrapper, Col } from 'react-native-table-component';
console.disableYellowBox = true;




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
    },[reload])

    console.log('results are ', results)
    return(
        <View style={globalStyles.screen}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.headerText}> Results: </Text>
            </View>

            <ScrollView horizontal={true} style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead} widthArr={[80, 150, 150, 100, 150, 300]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                        <Col style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={tableData} widthArr={[80, 150, 150, 100, 150, 300]} textStyle={styles.text}/>
                    </TableWrapper>
                </Table>
            </ScrollView>
        </View>
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
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
});