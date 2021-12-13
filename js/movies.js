$(document).ready(function(){
    "use strict";

    const MOVIE_URL = 'https://lively-flash-tumble.glitch.me/movies';
    const row = $('.row')
    const loading = $('.loading-container')
    const btn = $('#addMovie')
    const deleteOptions = {
        method: 'DELETE',
       header:{
            'Content-Type': 'application/json'
       }
   }

   const fetchData = (delay) => {
        $('.loading-container').css('margin-top', '150px')
        loading.toggle('hidden')
        row.toggle('hidden')
        setTimeout(function(){
           fetch(url)
               .then(res => res.json())
               .then(data => {
                   renderHTML(data);
               })

       })
   }
//
// //get request
//     let getAllMovies = () => {
//         return fetch(MOVIE_URL).then(resp => resp.json()).catch(err => console.error(err));
//     }
//     getAllMovies().then(data => console.log(data));






});