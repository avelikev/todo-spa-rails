class ToDoController < ApplicationController
	before_filter :set_lists

	def main
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

	def delete_list
		@list = List.find( delete_list_params[ :id ] )
		@list.destroy

		@selected_list = List.find( delete_list_params[ :selected_id ] ) rescue nil

		respond_to do |format|
			format.js { render "delete_list" }
		end
	end

	def select_list
		@list = List.find( select_list_params[ :id ] )

		respond_to do |format|
			format.js { render "select_list" }
		end
	end

	private

	def set_lists
		@lists = List.all
	end

	def add_list_params
		params.permit( :name )
	end

	def delete_list_params
		params.permit( :id, :selected_id )
	end

	def select_list_params
		params.permit( :id )
	end
end
