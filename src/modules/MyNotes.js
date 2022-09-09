import $ from 'jquery'

class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        $("#my-notes").on("click", ".delete-note", this.deleteNote);
        $(".submit-note").on("click", this.createNote.bind(this))
        $("#my-notes").on("click", ".edit-note", this.editNote.bind(this))
        $("#my-notes").on("click", ".update-note", this.updateNote.bind(this))
    }

    createNote() {
        const title = $(".new-note-title")
        const body =  $(".new-note-body")

        let newPost = {
            'title': title.val(),
            'content': body.val(),
            'status': "publish"
        }

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/',
            type: 'POST',
            data: newPost,
            success: (response) => {
                title.val('');
                body.val('');
                $(`
                    <li data-id="${response.id}">
                        <input class="note-title-field" type="text" value="${response.title.raw}" readonly>
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                        <textarea class="note-body-field" cols="30" rows="10" readonly>
                            ${response.content.raw}
                        </textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                    </li>
                `).prependTo("#my-notes").hide().slideDown();
                console.log("Congrats");
                console.log(response)
            },
            error: (response) => {
                if(response.responseText == "You have reached your note limit.") {
                    $(".note-limit-message").addClass("active");
                }
                console.log("Sorry");
                console.log(response)
            }
        })
    }

    deleteNote(event) {
        let thisNote = $(event.target).parents("li")

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'DELETE',
            success: (response) => {
                thisNote.slideUp();
                console.log("Congrats");
                console.log(response);
                if(response.userNoteCount < 5) {
                    $(".note-limit-message").removeClass("active");
                }
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response)
            }
        })
    }

    updateNote(event) {
        let thisNote = $(event.target).parents("li")
        let updatePost = {
            'title': thisNote.find(".note-title-field").val(),
            'content': thisNote.find(".note-body-field").val()
        }

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'POST',
            data: updatePost,
            success: (response) => {
                this.makeNoteReadonly(thisNote)
                console.log("Congrats");
                console.log(response)
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response)
            }
        })
    }

    editNote(event) {
        let thisNote = $(event.target).parents("li")
        if(thisNote.data("state") == "editable") {
            this.makeNoteReadonly(thisNote);
        } else {
            this.makeNoteEditable(thisNote)
        }
    }

    makeNoteEditable(thisNote) {
        thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel')
        thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field")
        thisNote.find(".update-note").addClass("update-note--visible")
        thisNote.data("state", "editable")
    }

    makeNoteReadonly(thisNote) {
        thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit')
        thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field")
        thisNote.find(".update-note").removeClass("update-note--visible")
        thisNote.data("state", "cancel")
    }

}

export default MyNotes