import $ from 'jquery'

class Like {
    constructor() {
        this.events();
    }

    events() {
        $(".like-box").on("click", this.ourClickDispatcher.bind(this))
    }

    ourClickDispatcher(event) {
        const currentLikeBox = $(event.target).closest(".like-box")

        if(currentLikeBox.data('exists') === 'yes') {
            this.deleteLike(currentLikeBox);
        } else {
            this.createLike(currentLikeBox);
        }
    }

    createLike(currentLikeBox) {
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'POST',
            data: {
                'professorID': currentLikeBox.data('professor')
            },
            success: (response) => {
                console.log(response)
            },
            error: (response) => {
                console.log(response)
            }
        })
    }

    deleteLike() {
        $.ajax({
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'DELETE',
            success: (response) => {
                console.log(response)
            },
            error: (response) => {
                console.log(response)
            }
        })
    }
}

export default Like
