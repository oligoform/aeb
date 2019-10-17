define( [ 'jquery', 'core/theme-app', 'root/config' ], function( $, App, Config ) {

	/**
	 * Basic (remote) search & filter on post lists.
	 * Shows how to implement a search by string and category: search form displayed in 
	 * archive template, and current screen refreshes whith search results when submitting form.
	 * Can be applied to all app's archives or just to a custom archive template (linked to 
	 * a corresponding "Latest posts" component for example) to implement a specific 
	 * search screen in the app.
	 * 
	 * Replace "category/categories" by any custom taxonomy of yours to extend this code 
	 * to your own content types.
	 * 
	 * Require this my-search.js module in functions.js by adding 
	 * "theme/js/my-search" to the "define" line of functions.js:
	 * define( [..., 'theme/js/my-search'], function( ... ) 
	 * 
	 * This code rely on a HTML search form that is included in archive.html.
	 * 
	 * To work, this code also needs the corresponding PHP code that
	 * does the searching work on server side.
	 */
	
	/**
	 * Memorize current search so that it is always available,
	 * even after changing screen
	 */
	var current_search = {
		search_string: '',
		category_slug: ''
	};

	/**
	 * When subimitting search form, call the "Live Query" web service
	 * (automatically called through App.refreshComponent() ) that
	 * filters the current component's list according to current search params.
	 */
	$( '#app-layout' ).on( 'click', '#go-filter', function( e ) {
		e.preventDefault();
		
		//Set search params from HTML form:
		current_search.search_string = $('#search_string').val().trim();
		current_search.category_slug = $('#categories').val();
		
		//Get updated data from server for the current component:
		App.refreshComponent({
			success: function( answer, update_results ) {
				//Server answered with a filtered list of posts. 
				//Reload current screen to see the result:
				App.reloadCurrentScreen();
			},
			error: function( error ) {
				//Maybe do something if filtering went wrong.
				//Note that "No network" error events are triggered automatically by core
			}
		});

	} );
	
	/**
	 * Add our search params to web services that retrieve our post list.
	 * Applies to "Live Query" web service (that retrieves filtered component's post list)
	 * and to "Get More Posts" web service (so that search filters apply to pagination too).
	 */
	App.filter( 'web-service-params', function( web_service_params ) {
		
		//If search form is there:
		if ( $('#filter-form').is(":visible") ) {
			//If the user provided non empty search params:
			if( current_search.search_string !== '' || current_search.category !== '' ) {
				//Add search params to the data sent to web service:
				web_service_params.my_search_filters = current_search;
				//Those params will be retrieved with WpakWebServiceContext::getClientAppParam( 'my_search_filters' )
				//on server side.
			}
		}
		
		return web_service_params;
	} );
	
	/**
	 * Add 
	 * - current search params
	 * - available categories for filtering
	 * to the archive template, so that they're available in archive.html.
	 */
	App.filter( 'template-args', function( template_args, view_type, view_template ) {
		
		if ( view_type === 'archive' ) {
			template_args.current_search = current_search;
			template_args.categories = Config.options.categories;
			
			var current_component = App.getCurrentComponent();
			template_args.is_search = current_component.data.meta.is_search;
		}
		
		return template_args;
	} );

} );
