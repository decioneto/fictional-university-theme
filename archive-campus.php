<!-- Páginas responsável para exibir informações dos campus -->

<?php 
  get_header();
  pageBanner(array(
    'title' => 'Our campuses',
    'subtitle' => 'We have several conveniently located campuses.'
  )); 
?>

<div class="container container--narrow page-section">
  <div class="acf-map">
    <?php
      while(have_posts()) {
        the_post(); 
        $mapLocation = get_field('map_location')
        
    ?>
          <div 
            class="marker" 
            data-lat="<?php echo $mapLocation['lat'] ?>" 
            data-lgt="<?php echo $mapLocation['lgt'] ?>"
          >
            <h3><a href="<?php the_permalink(); ?>"><?php the_title() ?></a></h3>
            <?php echo $mapLocation['address'] ?>
          </div>
      <?php } ?>
  </div>
      <ul class="link-list min-list">

      <?php while(have_posts()) {
        the_post(); ?>
         <li>
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </li>
    <?php }  echo paginate_links(); ?>
    </ul> 
</div>
  
<?php get_footer();?>