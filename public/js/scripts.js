
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
                            <small class="card-meta mb-2">${card.subtitle}</small>
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

    async function fetchCardsData() {
        try {
            const response = await axios.get('/cards-data');
            return response.data; // JSON data is already parsed
        } catch (error) {
            console.error('Error fetching cards data:', error);
            return [];
        }
    }

    $(document).ready(async function() {
        try {
            // Fetch the cards data
            const cardsData = await fetchCardsData();
    
            // Iterate over each card and append the HTML to the card-container
            cardsData.forEach(card => {
                const cardHtml = createCardHtml(card);
                $('#card-container').append(cardHtml);
            });
        } catch (error) {
            console.error('Error displaying cards:', error);
        }
    });

   
    $('#card-container').on('click', '.delete-card', async function() {
        const cardId = $(this).data('id');

        try {
            const response = await axios.delete(`/delete-card/${cardId}`);
            if (response.data.success) {
                console.log('Card deleted successfully.');
                // Remove the card from the UI
                $(`#card-${cardId}`).remove();
            }
        } catch (error) {
            console.error('Error deleting card:', error);
        }
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
