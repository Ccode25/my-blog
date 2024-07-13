/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

// $(document).ready(function () {
//     $('#mybutton').on('click', function (e) {
//         e.preventDefault();
//         $('#card-holder .row').append(
//             `<div class="col-lg-4 col-md-6 col-sm-12 mb-4">
//                 <div class="text-dark card card-has-bg click-col" style="background-image:url('https://source.unsplash.com/600x900/?computer,design')">
//                     <img alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" class="card-img d-none" src="https://source.unsplash.com/600x900/?computer,design">
//                     <div class="card-img-overlay d-flex flex-column">
//                         <div class="card-body">
//                             <small class="card-meta mb-2">Thought Leadership</small>
//                             <h4 class="card-title mt-0">
//                                 <a class="text-dark" href="https://creativemanner.com">Design Studio Lorem Ipsum Sit Amet Consectetur dipisi?</a>
//                             </h4>
//                             <small><i class="far fa-clock"></i> October 15, 2020</small>
//                         </div>
//                         <div class="card-footer">
//                             <a class="btn btn-dark button-round" href="form">Add Post</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>`
//         );
//     });
// });

// function createCardHtml(card) {
//     return `
//         <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
//                 <div class="text-dark card card-has-bg click-col" style="background-image:url('https://source.unsplash.com/600x900/?computer,design')">
//                     <img alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" class="card-img d-none" src="https://source.unsplash.com/600x900/?computer,design">
//                     <div class="card-img-overlay d-flex flex-column">
//                         <div class="card-body">
//                             <small class="card-meta mb-2">Thought Leadership</small>
//                             <h4 class="card-title mt-0">
//                                 <a class="text-dark" href="https://creativemanner.com">Design Studio Lorem Ipsum Sit Amet Consectetur dipisi?</a>
//                             </h4>
//                             <small><i class="far fa-clock"></i> October 15, 2020</small>
//                         </div>
//                         <div class="card-footer">
//                             <a class="btn btn-dark button-round" href="form">Add Post</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     `;
// }

// // Fetch existing cards HTML and append to the card-container
// $.get('/cards', function(cardHtml) {
//     $('#card-container').append(cardHtml);
// });

// // Handle "Create post" click event
// $('#mybutton').click(function(event) {
//     event.preventDefault(); // Prevent the default link behavior

//     const newCard = { title: 'Card 2', content: 'Content for card 2' };
    
//     // Create new card HTML and append to card-container
//     const newCardHtml = createCardHtml(newCard);
//     $('#card-container').append(newCardHtml);
// });


// $(document).ready(function() {
//     // Function to create a card HTML from card data
function createCardHtml(card) {
    return `
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4" id="card-${card.id}">
        <div class="text-dark card card-has-bg click-col" style="background-image:url('https://source.unsplash.com/600x900/?computer,design')">
            <img alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" class="card-img d-none" src="https://source.unsplash.com/600x900/?computer,design">
            <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">
                    <small class="card-meta mb-2">Thought Leadership</small>
                    <h4 class="card-title mt-0">
                        <a class="text-dark" href="https://creativemanner.com">${card.title}</a>
                    </h4>
                    <small><i class="far fa-clock"></i> October 15, 2020</small>
                </div>
                <div class="card-footer">
                    <a class="btn btn-dark button-round" href="form">Add Post</a>
                    <button class="btn btn-danger button-round delete-card" data-id="${card.id}">Delete</button>
                </div>
            </div>
        </div>
    </div>`;
}

$(document).ready(function() {
    // Fetch existing cards HTML and append to the card-container
    $.get('/cards-data', function(cardsData) {
        cardsData.forEach(card => {
            const cardHtml = createCardHtml(card);
            $('#card-container').append(cardHtml);
        });
    });

    // Handle "Create post" click event
    $('#mybutton').click(function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // Extract data from form inputs
        const title = $('#blogTitle').val();
        const content = $('#blogContent').val();

        const newCard = {
            title: title,
            content: content
        };

        // Send new card data to the server
        $.ajax({
            url: '/add-card',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newCard),
            success: function(response) {
                if (response.success) {
                    // Create new card HTML and append to card-container
                    const newCardHtml = createCardHtml({ ...newCard, id: response.id });
                    $('#card-container').append(newCardHtml);
                }
            }
        });
    });

    // Handle delete card click event
    $('#card-container').on('click', '.delete-card', function() {
        const cardId = $(this).data('id');

        // Send delete request to the server
        $.ajax({
            url: `/delete-card/${cardId}`,
            type: 'DELETE',
            success: function(response) {
                if (response.success) {
                    console.log('Card deleted successfully.');

                    // Remove the card from the UI
                    $(`#card-${cardId}`).remove();
                }
            }
        });
    });
});