$(document).ready(function () {
    "use strict";

    //Glitch movie API url
    const MOVIE_URL = 'https://lively-flash-tumble.glitch.me/movies';
    const row = $('.row')
    const loading = $('.loading-container')
    const btn = $('#addMovie')
    let modalContainer = $(`.modal-container`)
    let mainHTML = ""
    let modalHTML = ""
    const deleteOptions = {
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json'
        }
    }

    const fetchData = (delay) => {
        $('.loading-container').css('margin-top', '150px')
        loading.toggle('hidden')
        row.toggle('hidden')
        setTimeout(function () {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    renderHTML(data);
                })
                .then($('.loading-container').css('margin-top', '0'))
                .then(loading.toggle('hidden'))
                .then(row.toggle('hidden'))
                .catch(error => console.error(error))
        }, delay)
    }

    const renderHTML = data => {
        mainHTML = ""
        modalHTML = ""
        createModal(data)
        for (let ele of data) {
            mainHTML += `<div class= "col-12 col-md-6 col-lg-4 movie-columns">
            <div class ="card" style= "width: 18rem;">
<!--          //Need to add a image -->
            <img id="movie${ele.id}" src="${ele.poster}" class="card-img-top" alt="movie poster" style="height: 100%; width: auto">
            <div class="info${ele.id} hidden">
            <div class="card-body">
            <h5 class="card-title">${ele.title}</h5>
            <p class = "card-text">${ele.plot}</p>
            <p class = "card-text">Rating: ${ele.rating}</p>
            <p class = "card-text">Release Year: ${ele.year}</p>
            <p class = "card-text">Genres: ${ele.genre}</p>
            <button class="btn-block btn btn-warning edit-data${ele.id}" data-toggle="modal" data-target="editModal${ele.id}">Edit</button>
            <button id ="deleteMovie${ele.id}" class ="btn-block btn btn-warning">Delete</button>
</div>
</div>
</div>
</div>`
        }
    }
    row.html(mainHTML)
    for(let ele of data)    {
        $(`#deleteMovie${ele.id}`).click(function() {
            $(`#deleteMovie${ele.id}`).attr('disabled')
            let movieDeleted = confirm(`Are you sure I should delete ${ele.title}?`)
            // if deleted fetch
            if (movieDeleted) {
                fetch(`${url}/${ele.id}`, deleteOptions)
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .then(fetchData(2000))
                    .then($(`#deletedMovie${ele.id}`).removeAttribute('disabled'))
                    .catch(error => console.error(error))
            } else {
                $(`#editMovie${ele.id}`).removeAttribute('disabled')
            }
        })
    }

});

//
// //get request-->
//     let getAllMovies = () => {-->
//         return fetch(MOVIE_URL).then(resp => resp.json()).catch(err => console.error(err));-->
//     }-->
//     getAllMovies().then(data => console.log(data));-->



