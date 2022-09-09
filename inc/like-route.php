<?php

function universityLikeRoutes() {
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST',
        'callback' => 'createLike'
    ));
    
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE',
        'callback' => 'deleteLike'
    ));
};

function createLike($data) {
    $professorId = sanitize_text_field($data['professorID']);

    wp_insert_post(array(
        'post_type' => 'like',
        'post_status' => 'publish',
        'post_title' => 'Second PHP test',
        'meta_input' => array(
            'liked_professor_id' => $professorId
        )
    ));
};

function deleteLike() {
    return 'Thanks for trying to delete';
};

add_action('rest_api_init', 'universityLikeRoutes');