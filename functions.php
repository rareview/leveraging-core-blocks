<?php
/**
 * Demo functions and definitions.
 */

function demo_enqueue_styles() {
	wp_enqueue_style(
		'demo-style',
		get_stylesheet_directory_uri() . '/style.css',
		[],
		'1.0.0'
	);
}
add_action( 'wp_enqueue_scripts', 'demo_enqueue_styles' );

function demo_block_variations() {
    wp_enqueue_script(
		'blocks-demo',
		get_stylesheet_directory_uri() . '/dist/js/blocks-demo.min.js',
		[
			'wp-blocks',
			'wp-editor',
			'wp-element',
			'wp-dom-ready',
			'wp-i18n',
			'wp-edit-post',
			'wp-hooks',
		],
		'1.0.0',
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'demo_block_variations' );
