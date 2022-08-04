<?php

function university_files() {
  wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
  wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
}

add_action('wp_enqueue_scripts', 'university_files'); //função usada para adicionae styles e scripts

function university_features() {
  /*  
    * funções para utilizar os menus criados no admin
  */

  // register_nav_menu('headerMenuLocation', 'Header Menu Location'); 
  // register_nav_menu('footerMenuLocationOne', 'Footer Menu Location One');
  // register_nav_menu('footerMenuLocationTwo', 'Footer Menu Location Two');
  add_theme_support('title-tag');
}

/*  
  * função usada para adicionar features nas páginas
  * nesse caso, usado para adicional os titles em cada página
  * ou também para usar os menus criados no admin
*/
add_action('after_setup_theme', 'university_features');

// function university_post_types() {
//   register_post_type('event', array(
//     'public' => true,
//     'labels' => array(
//       'name' => 'Events'
//     ),
//     'menu_icon' => 'dashicons-calendar'
//   ));
// }

// /*  
//   * função usada para adicionar custom posts type
// */
// add_action('init', 'university_post_types');