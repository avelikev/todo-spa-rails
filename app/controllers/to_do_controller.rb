class ToDoController < ApplicationController
	before_filter :set_lists

	def main
		# render main.html.erb
	end

	def select_list
		@list = List.find( select_list_params[ :id ] )

		respond_to do |format|
			format.js { render "select_list" }
		end
	end

	def add_list
		@list = List.new( add_list_params )

		if @list.save
			respond_to do |format|
				format.js { render "add_list" }
			end
		else
			render js: "alert( 'Please enter a valid name.' );"
		end
	end

	def add_list_item
		@list = List.find( add_list_item_params[ :list_id ] )
		list_item = ListItem.new( list: @list, description: add_list_item_params[ :description ] )

		if list_item.save
			respond_to do |format|
				format.js { render "add_list_item" }
			end
		else
			render js: "alert( 'Please enter a valid item.' );"
		end
	end

	def delete_list
		@list = List.find( delete_list_params[ :id ] )
		@list.destroy

		@selected_list = List.find( delete_list_params[ :selected_id ] ) rescue nil

		respond_to do |format|
			format.js { render "delete_list" }
		end
	end

	def delete_list_item
		list_item = ListItem.find( delete_list_item_params[ :list_item_id ] )
		@list = list_item.list
		list_item.destroy

		respond_to do |format|
			format.js { render "delete_list_item" }
		end
	end

	def mark_completed
		list_item = ListItem.find( mark_completed_params[ :list_item_id ] )
		list_item.mark_completed

		@list = list_item.list

		respond_to do |format|
			format.js { render "mark_completed" }
		end
	end

	private

	def set_lists
		@lists = List.all
	end

	def add_list_params
		params.permit( :name )
	end

	def add_list_item_params
		params.permit( :list_id, :description )
	end

	def delete_list_params
		params.permit( :id, :selected_id )
	end

	def delete_list_item_params
		params.permit( :list_item_id )
	end

	def select_list_params
		params.permit( :id )
	end

	def mark_completed_params
		params.permit( :list_item_id )
	end
end
