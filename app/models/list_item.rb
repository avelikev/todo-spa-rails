class ListItem < ActiveRecord::Base
	belongs_to :list

	validates :description, presence: true, length: { in: 1..255 }

	def mark_completed
		self.completed = true
		self.save
	end
end
