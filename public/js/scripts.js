/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
$(document).ready(function() {
    let scrollPos = 0;
    const mainNav = $('#mainNav');
    const headerHeight = mainNav.height();

    $(window).on('scroll', function() {
        const currentTop = $(document).scrollTop();
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.hasClass('is-fixed')) {
                mainNav.addClass('is-visible');
            } else {
                console.log(123);
                mainNav.removeClass('is-visible is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.removeClass('is-visible');
            if (currentTop > headerHeight && !mainNav.hasClass('is-fixed')) {
                mainNav.addClass('is-fixed');
            }
        }
        scrollPos = currentTop;
    });

    // Function to create a card HTML from card data
    function createCardHtml(card) {
        const shortContent = card.content.length > 100 ? card.content.substring(0, 100) + '...' : card.content;
        return `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4" id="card-${card.id}">
                <div class="text-dark card card-has-bg click-col" style="background-image:url('https://source.unsplash.com/600x900/?computer,design')">
                    <img alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" class="card-img d-none" src="https://source.unsplash.com/600x900/?computer,design">
                    <div class="card-img-overlay d-flex flex-column">
                        <div class="card-body">
                            <small class="card-meta mb-2">${ card.subtitle}</small>
                            <h4 class="card-title mt-0">
                                <a class="text-dark" href="#">${card.title}</a>
                            </h4>
                            <p>${shortContent}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-dark button-round read-more" data-id="${card.id}" data-title="${card.title}" data-content="${card.content}">Read More</button>
                            <button class="btn btn-danger button-round delete-card" data-id="${card.id}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // Fetch existing cards HTML and append to the card-container
    $.get('/cards-data', function(cardsData) {
        cardsData.forEach(card => {
            const cardHtml = createCardHtml(card);
            $('#card-container').append(cardHtml);
        });
    });

    // Handle form submission
    $('#blogForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Extract data from form inputs
        const title = $('#blogTitle').val();
        const content = $('#blogContent').val();
        const subtitle = $('#blogSubTitle').val();

        const newCard = {
            title: title,
            content: content,
            subtitle: subtitle
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

                    // Reset the form
                    $('#blogForm')[0].reset();
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

    // Handle read more click event
    $('#card-container').on('click', '.read-more', function() {
        const title = $(this).data('title');
        const content = $(this).data('content');
        
        // Set the modal title and content
        $('#readMoreModalLabel').text(title);
        $('#modalContent').text(content);

        // Show the modal
        $('#readMoreModal').modal('show');
    });
});
