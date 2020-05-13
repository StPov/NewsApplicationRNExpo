import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import NewsCard from '../services/models/Article'
import newApi from '../services/network/NewsApi'

export default function News() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        getNewsFromAPI()
    }, [])

    function getNewsFromAPI() {
        newApi.get('everything?q=bitcoin&apiKey=8c66ce1dfb9245cf9fe9be0a484d713e')
            .then(async function (response) {
                setNews(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    if (!news) {
        return null
    }

    return (
        <View>
            <FlatList data={news.articles}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item}) => {
                    return <NewsCard item = {item}/>
                }}
            />
        </View>
    )
}
