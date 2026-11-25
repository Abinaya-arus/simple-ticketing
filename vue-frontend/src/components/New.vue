<script setup>
import { reactive } from "vue";

import { Dialog, Button, FormControl, TextEditor, createResource } from "frappe-ui";

const show = defineModel();

const emit = defineEmits(["created"]);

const newTicket = reactive({
	title: "",
	description: "",
	status: "Open",
	purchase_date: "",
	category: "Paper Quality",
});
const statusOptions = ["Open", "Waiting for reply", "Resolved", "Closed"];

const categoryOptions = ["Paper Quality", "Delivery", "Other"];

const ticket = createResource({
	url: "frappe.client.insert",
});
async function createTicket() {
	try {
		const response = await fetch("http://simple.localhost:8000/api/resource/Support Ticket", {
			method: "POST",

			credentials: "include",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				doctype: "Support Ticket",

				title: newTicket.title,

				description: newTicket.description,

				status: newTicket.status,

				purchase_date: newTicket.purchase_date,

				category: newTicket.category,
			}),
		});

		if (!response.ok) {
			alert("Create Failed");

			return;
		}

		alert("Ticket Created");

		show.value = false;

		emit("created");
	} catch (err) {
		console.log(err);
	}
}
</script>
<template>
	<Dialog v-model="show" size="2xl">
		<template #title> Create Support Ticket </template>

		<template #body-content>
			<FormControl label="Title" type="text" v-model="newTicket.title" />

			<div class="mt-4">
				<label> Description </label>

				<TextEditor
					placeholder="Describe your problem..."
					@change="(val) => (newTicket.description = val)"
				/>
			</div>

			<div class="mt-4">
				<FormControl
					label="Status"
					type="select"
					:options="statusOptions"
					v-model="newTicket.status"
				/>
			</div>

			<div class="mt-4">
				<FormControl label="Purchase Date" type="date" v-model="newTicket.purchase_date" />
			</div>

			<div class="mt-4">
				<FormControl
					label="Category"
					type="select"
					:options="categoryOptions"
					v-model="newTicket.category"
				/>
			</div>
		</template>

		<template #actions>
			<Button theme="green" @click="createTicket"> Create </Button>
			<Button theme="green" @click="createTicket"> Create </Button>
		</template>
	</Dialog>
</template>
