// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function selectList(id) {
	var selectedID = id;
	var selectListData = { "id": selectedID };
	$.ajax({
		type:"GET",
		url:"/select_list",
		data: selectListData,
		success:function () {
		},
		error:function (xhr, msg, error) {
			alert( "Something went wrong." );
		}
	});
}

function submitNewList() {
	var inputValue = $('.addListForm').find('input').val();
	var addListData = { "name": inputValue };
	$.ajax({
		type:"POST",
		url:"/add_list",
		data: addListData,
		success:function () {
		},
		error:function (xhr, msg, error) {
			alert( "Something went wrong." );
		}
	});
}

function deleteList(id) {
	var selectedItem = $('.viewList .selectedList');
	var selectedID = null;
	if ( selectedItem.length ) {
		var selectedID = selectedItem.first().attr('data-list-id');
	}
	var deletedID = id;
	var deleteListData = { "id": deletedID, "selected_id": selectedID };
	$.ajax({
		type:"POST",
		url:"/delete_list",
		data: deleteListData,
		success:function () {
		},
		error:function (xhr, msg, error) {
			alert( "Something went wrong." );
		}
	});
}

function checkSubmit(e) {
	if ( e.keyCode == 13 ) {
		submitNewList();
	}
}

function addSelectedClassToList(id) {
	$('.viewList[data-list-id='+id+']').parent().addClass('selectedList');
}

function deselectAllLists() {
	$('.selectedList').each( function() {
		$(this).removeClass();
	} );
}

$(document).on('click', '.viewList', function(){
	var selectedID = $(this).attr('data-list-id');
	selectList( selectedID );
});

$(document).on('click', '.deleteList', function(){
	var deletedID = $(this).parent().find('.viewList').attr('data-list-id');
	deleteList( deletedID );
});

$(document).on('click', '.addNewList', function(){
	$('.addNewList').addClass('hide');
	$('.addListForm').removeClass('hide');
	$('.addListForm').find('input').focus();
});

$(document).on('click', '.addListForm .cancelButton', function(){
	$('.addNewList').removeClass('hide');
	$('.addListForm').addClass('hide');
	$('.addListForm').find('input').val("");
});

$(document).on('click', '.addListForm .saveButton', function(){
	submitNewList();
});
