<!-- Páginas responsável para exibir informações do evento -->

<?php 
  get_header();
  pageBanner(array(
    'title' => 'Past Events',
    'subtitle' => 'Recap for our past events.'
  )) 
?>

<div class="container container--narrow page-section">
  <?php
    $today = date('Ymd');
    $pastEvents = new WP_Query(array(
      'paged' => get_query_var('paged', 1), //precisa disso para aprensentar todos os eventos na paginação
      'post_type' => 'event',
      'order' => 'ASC',
      'orderby' => 'meta_value_num', //muda o tipo do campo para distribuir
      'meta_key' => 'event_date', // tipo do campo que irá filtrar
      'meta_query' => array( //cria o tipo de comparação
        array(
          'key' => 'event_date',
          'compare' => '<',
          'value' => $today,
          'type' => 'numeric'
        ),
      )
    ));

    while($pastEvents -> have_posts()) {
      $pastEvents -> the_post();
      get_template_part('template-parts/content-event');
    }

    echo paginate_links(array(
      'total' => $pastEvents -> max_num_pages
    ));
  ?>
</div>
  
<?php get_footer();?>