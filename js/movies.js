$(document).ready(function () {
    "use strict";

    //Glitch movie API url
    const url = 'https://lively-flash-tumble.glitch.me/movies';
    const loading = $('.loading-container')
    const mainRow = $('.row')
    const addBtn = $('#addMovie')
    let modalContainer = $(`.modal-container`)
    let modalHTML = ""
    let mainHTML = ""
    const deleteOptions = {
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json'
        }
    }

    const fetchData = (delay) => {
        $('.loading-container').css('margin-top', '150px')
        loading.toggle('hidden')
        mainRow.toggle('hidden')
        setTimeout(function () {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    renderHTML(data);
                })
                .then($('.loading-container').css('margin-top', '0'))
                .then(loading.toggle('hidden'))
                .then(mainRow.toggle('hidden'))
                .catch(error => console.error(error))
        }, delay)
    }

    const renderHTML = data => {
        mainHTML = ""
        modalHTML = ""
        createModal(data)
        for (let ele of data) {
            mainHTML += `<div class= "col-12 col-md-6 col-lg-4 movie-columns">
            <div class ="card" style= "width: 17rem;">
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
    mainRow.html(mainHTML)
    for (let ele of data) {
        $(`#deleteMovie${ele.id}`).click(function () {
            $(`#deleteMovie${ele.id}`).attr('disabled')
            let movieDeleted = confirm(`Are you sure I should delete ${ele.title}?`)
            // if deleted fetch
            if (movieDeleted) {
                fetch(`${url}/${ele.id}`, deleteOptions)
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .then(fetchData(2000))
                    .then($(`#deletedMovie${ele.id}`).removeAttr('disabled'))
                    .catch(error => console.error(error))
            } else {
                $(`#deleteMovie${ele.id}`).removeAttr('disabled')
            }
        })
    }
    $(`#editMovie${ele.id}`).click(function () {
        $(`#editMovie${ele.id}`).attr('disabled');
        let userTitle = $(`#titleInput${ele.id}`).val()
        let userRating = $(`#ratingSelect${ele.id}`).val()
        let userYear = $(`#yearInput${ele.id}`).val()
        let userGenre = $('#genreInput${ele.id}').val()
        let userPlot = $(`#plotInput${ele.id}`).val()
        let userMovie = {
            title: userTitle,
            rating: userRating,
            year: userYear,
            genre: userGenre,
            plot: userPlot
        }
        const patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userMovie)
        }
        fetch(`${url}/${ele.id}`, patchOptions)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(fetchData(3000))
            .then($(`#editMovie${ele.id}`).removeAttr('disabled'))
            .catch(error => console.error(error))
    })
    $(`#movie${ele.id}`).click(function () {
        $(`.info${ele.id}`).toggle('hidden')
        $(`#movie${ele.id}`).toggle('hidden')
    })
    $(`.info${ele.id}`).click(function () {
        $(`.info${ele.id}`).toggle('hidden')
        $(`#movie${ele.id}`).toggle('hidden')
    })

    const createModal = data => {
        for (let ele of data) {
            modalHTML += `<div class="modal fade" id= editModal${ele.id}" tabindex="-1" role ='dialog' aria-labelledby="${ele.id}ModalLabel"
                          <div class="modal-dialog" role=document">
                          <div class="modal-content">
                          <div class="modal-header">
                          <h5 class="modal-title" id="${ele.id}ModalLabel">Edit ${ele.title}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                          <div class="modal-body">
                            <input id="titleInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value ="${ele.title}">
                            <input id="yearInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value ="${ele.year}">
                            <input id="genreInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value ="${ele.genre}">
                            <div class ="input-group mb-2 mr-sm-2">
                                <div class ="input-group-prepend">
                                    <div class="input-group-text">Rating</div>
                                </div>
                                    <select id="ratingSelect${ele.id}" class="form-control">  
 
</div>
</div>
</div>
</div>
</div>`

        }
    }
    if (ele.rating === '1') {
        modalHTML += `<option selected>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>`
    } else if (ele.rating === '2') {
        modalHTML += `<option>1</option>
                          <option selected>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>`
    } else if (ele.rating === '3') {
        modalHTML += `<option>1</option>
                          <option>2</option>
                          <option selected>3</option>
                          <option>4</option>
                          <option>5</option>`
    } else if (ele.rating === '4') {
        modalHTML += `<option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option selected>4</option>
                          <option>5</option>`
    } else if (ele.rating === '5') {
        modalHTML += `<option>1</option>
                          <option>3</option>
                          <option>3</option>
                          <option>4</option>
                          <option selected>5</option>`
    }
    modalContainer.html(modalHTML)


    addBtn.click(() => {
        addBtn.attr('disabled');
        let userTitle = $(`#titleInput`).val()
        let userRating = $('#ratingSelect').val()
        let userYear = $(`#yearInput`).val()
        let userGenre = $(`#genreInput`).val()
        let userPlot = $(`#plotInput`).val()
        let userMovie = {
            title: userTitle,
            rating: userRating,
            year: userYear,
            genre: userGenre,
            plot: userPlot,
            // poster:
        }

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userMovie)
        }
        fetch(url, postOptions)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(fetchData(2000))
            .then(addBtn.removeAttr('disabled'))
            .catch(error => console.error(error))
     })

        fetchData(5000);
    
     });


//
// //get request-->
//     let getAllMovies = () => {-->
//         return fetch(MOVIE_URL).then(resp => resp.json()).catch(err => console.error(err));-->
//     }-->
//     getAllMovies().then(data => console.log(data));-->
