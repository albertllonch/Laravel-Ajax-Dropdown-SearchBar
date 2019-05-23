# Laravel-Ajax-Dropdown-SearchBar
I made a search-input field that displays query result in a dropdown, integrated with Laravel and Ajax for a project, because I didn't find any on the web.
The html/css/js layout I found them on codepen, all credit to [https://codepen.io/cwattrus/](https://codepen.io/cwattrus/)
## Modules
 - Laravel function Controller
 - CSS navbar style
 - JS Ajax Handler

## Quick Start

 1. Laravel Controller
	````php
	function  search(){
		$query  =  $_POST['query'];	//HANDLE QUERY
		$results  =  DB::where('name','like', $query.'%')->get();
		$json  =  array();
		//CONSTRUCT JSON FOR AJAX
		foreach($results as  $result){
			$json[$result->id]=  array(
			'name'=>  $result->name,
			'description'=>  $result->description
		);
		}
		return  response()->json($json);
	}
	````
2. Ajax Setup for X-CSRF TOKEN
	```javascript
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	})
	
3. Javascript Ajax Handler
	```javascript
	$.ajax({
		type:'POST',
		url:'home/post',
		data: {'query': searchField},
		//Send data to Controller through AJAX
		success: function(results){
			if(jQuery.isEmptyObject(results)){
				$('#hits-container').html('<div id="no-results-message"> <p>No se encontraron resultados <em>"'+searchField+'"</em>.</p></div>');
			}
			else{
			//Construct OUTPUT TO HTML
				$('#hits-container').empty();
				jQuery.each(results, function(index,value){
					$('#hits-container').append('<a href="infoEvents/'+index+'" value="'+index+'"target="_blank"><div class="hit">'+
				'<div class="hit-content"><h2 class="hit-title">'+value['name']+
				'</h2><p class="hit-description">'+value['description'].trim().substring(0,150)+'...</p></div></div></a>');
				});
			}
		}
	})
4. Javascript html handling
	```javascript
	$(function() {
		$('#search-input').on('focus', function() {
			$('.nav-search').addClass('active');
		})
		$('#search-input').on('keyup', function() {
			$('#hits-container').scrollTop(0);
				var  searchField  =  $('#search-input').val();
				//AJAX SETUP
				//AJAX HANDLER
		$('.close-search').on('click', function(evt) {
			evt.preventDefault();
			$('#search-input').val('');
			$('.nav-search').removeClass('active');
		})
		$('#search-input').on('blur', function(evt) {
			if(!evt.isDefaultPrevented) {
				$('.nav-search').removeClass('active');
			}
		}) 
		$(document).on("click", function(e) {
			if ($(e.target).is("#search-input") ===  false) {
				$('.nav-search').removeClass('active');
			}
		});
	});
