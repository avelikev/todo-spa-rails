class CreateListItems < ActiveRecord::Migration
	def change
		create_table :list_items do |t|

			t.string :description
			t.references :list, null: false, index: true
			t.boolean :completed, null: false, default: false

		end
	end
end
