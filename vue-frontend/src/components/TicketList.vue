<script setup>
import { reactive, ref, onMounted } from "vue";



import New from "./New.vue";

import {
	Button,
	ListView,
	ListHeader,
	ListHeaderItem,
	ListRows,
	ListRow,
	ListRowItem,
	Badge,
} from "frappe-ui";

const showDialog = ref(false);

const columns = reactive([
	{ label: "Title", key: "title" },
	{ label: "Category", key: "category" },
	{ label: "Status", key: "status" },
]);

const rows = ref([]);



async function getTickets() {
	try {
		const response = await fetch(
			'http://localhost:8000/api/resource/Support Ticket?fields=["name","title","status","category"]',
			{
				credentials: "include",
			},
		);

		const data = await response.json();

		rows.value = data.data.map((ticket) => ({
			id: ticket.name,

			title: ticket.title,

			category: ticket.category,

			status: {
				label: ticket.status,

				color:
					ticket.status === "Open"
						? "blue"
						: ticket.status === "Resolved"
							? "green"
							: ticket.status === "Waiting for reply"
								? "orange"
								: "red",
			},
		}));
	} catch (err) {
		console.log(err);
	}
}

onMounted(() => {
	getTickets();
});
</script>

<template>
	<div class="p-6">
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-3xl font-bold">Support Tickets</h1>

			<Button theme="green" @click="showDialog = true"> Create Ticket </Button>
		</div>

		<New v-model="showDialog" @created="getTickets" />

		<ListView :columns="columns" :rows="rows" row-key="id">
			<ListHeader>
				<ListHeaderItem v-for="column in columns" :key="column.key" :item="column" />
			</ListHeader>

			<ListRows>
				<ListRow v-for="row in rows" :key="row.id" v-slot="{ column, item }" :row="row">
					<ListRowItem :item="item" :align="column.align">
						<Badge
							v-if="column.key === 'status'"
							variant="subtle"
							:theme="item.color"
							size="md"
							:label="item.label"
						/>
					</ListRowItem>
				</ListRow>
			</ListRows>
		</ListView>
	</div>
	
</template>
