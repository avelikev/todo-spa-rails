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

function markCompleted( listItemID ) {
	var markCompletedData = { "list_item_id": listItemID };
	$.ajax({
		type:"POST",
		url:"/mark_completed",
		data: markCompletedData,
		success:function () {
		},
		error:function (xhr, msg, error) {
			alert( "Something went wrong." );
		}
	});
}

function selectList( selectedID ) {
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

function addNewList() {
	var inputValue = $('.addNewListForm').find('input').val();
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

function addNewListItem() {
	var itemDescription = $('.addNewItemForm').find('input').val();
	var listID =  $('.addNewItemForm').attr('data-list-id');
	var addListItemData = { "list_id": listID, "description": itemDescription };
	$.ajax({
		type:"POST",
		url:"/add_list_item",
		data: addListItemData,
		success:function () {
		},
		error:function (xhr, msg, error) {
			alert( "Something went wrong." );
		}
	});
}

function deleteList( deletedID ) {
	var selectedItem = $('.selectedList');
	var selectedID = null;
	if ( selectedItem.length ) {
		selectedID = selectedItem.first().find('.viewList').attr('data-list-id');
	}
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

function deleteListItem( deletedID ) {
	var deleteListItemData = { "list_item_id": deletedID };
	$.ajax({
		type:"POST",
		url:"/delete_list_item",
		data: deleteListItemData,
		success:function () {
		},
		error:function (xhr, msg, error) {
			alert( "Something went wrong." );
		}
	});
}

function checkListSubmit( e ) {
	if ( e.keyCode == 13 ) {
		addNewList();
	}
}

function checkItemSubmit( e ) {
	var list_id = $( '.addNewItemForm' ).attr('data-list-id');
	if ( e.keyCode == 13 ) {
		addNewListItem();
	}
}

function addSelectedClassToList( id ) {
	$('.viewList[data-list-id='+id+']').parent().addClass('selectedList');
}

function deselectAllLists() {
	$('.selectedList').each( function() {
		// weird jquery bug
		// want to remove just selectedList class instead of removing all classes
		// but it fails to remove the class
		// apparently a common issue on jquery forums
		// $(this).removeClass('selectedList');
		$(this).removeClass();
	} );
}

$(document).on('click', '.checkBox', function(){
	var listItemID = $(this).parent().find('.listItem').attr('data-list-item-id');
	markCompleted( listItemID );
});

$(document).on('click', '.viewList', function(){
	var selectedID = $(this).attr('data-list-id');
	selectList( selectedID );
});

$(document).on('click', '.deleteList', function(){
	var deletedID = $(this).parent().find('.viewList').attr('data-list-id');
	deleteList( deletedID );
});

$(document).on('click', '.deleteItem', function(){
	var deletedID = $(this).parent().find('.listItem').attr('data-list-item-id');
	deleteListItem( deletedID );
});

$(document).on('click', '.addNewList', function(){
	$('.addNewList').addClass('hide');
	$('.addNewListForm').removeClass('hide');
	$('.addNewListForm').find('input').focus();
});

$(document).on('click', '.addNewListForm .cancelButton', function(){
	$('.addNewList').removeClass('hide');
	$('.addNewListForm').addClass('hide');
	$('.addNewListForm').find('input').val("");
});

$(document).on('click', '.addNewListForm .saveButton', function(){
	addNewList();
});

$(document).on('click', '.addNewItem', function(){
	$('.addNewItem').addClass('hide');
	$('.addNewItemForm').removeClass('hide');
	$('.addNewItemForm').find('input').focus();
});

$(document).on('click', '.addNewItemForm .cancelButton', function(){
	$('.addNewItem').removeClass('hide');
	$('.addNewItemForm').addClass('hide');
	$('.addNewItemForm').find('input').val("");
});

$(document).on('click', '.addNewItemForm .saveButton', function(){
	addNewListItem();
});




